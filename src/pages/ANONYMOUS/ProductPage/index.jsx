import { Col, Spin } from "antd"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useLocation } from "react-router-dom"
// import SwiperCore, { Autoplay } from "swiper"
import LayoutCommon from "src/components/Common/Layout"
import CategoryService from "src/services/CategoryService"
import ProductService from "src/services/ProductService"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import ProductCard from "./ProductCard"
import { ProductPageStyle } from "./styled"

const ProductPage = () => {
  // SwiperCore.use([Autoplay])
  const { category } = useLocation().state
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [listProduct, setListProduct] = useState([])
  const [listCategory, setListCategory] = useState([])

  const getListCategory = async () => {
    try {
      setLoading(true)
      const res = await CategoryService.getListCategory()
      if (res.isError) return
      setListCategory(res.Object.data)
    } finally {
      setLoading(false)
    }
  }
  const getListProduct = async () => {
    try {
      setLoading(true)
      const res = await ProductService.getProductByCategoryID(category.id)
      if (res.isError) return
      setListProduct(res.Object)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListCategory()
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
    if (category) getListProduct()
  }, [category])

  return (
    <LayoutCommon>
      <ProductPageStyle>
        <Spin spinning={loading}>
          <div className="container-product-page_content">
            <Col span={16}>
              <div className="category-title mb-1 ">
                {category?.ten_loai_san_pham}
              </div>
              <div
                className="category-description"
                dangerouslySetInnerHTML={{
                  __html: category.mo_ta,
                }}
              />
              <div className="title ">Danh sách sản phẩm</div>
              <div className="product-list">
                <Swiper
                  grabCursor={true}
                  spaceBetween={30}
                  modules={[Autoplay]}
                  slidesPerView={4}
                  autoplay={{ delay: 5000 }}
                >
                  {listProduct.map((product, i) => (
                    <SwiperSlide key={i}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </Col>
          </div>
          <div className="category-list">
            <div className="title mb-1">KHÁM PHÁ</div>
            <Swiper grabCursor={true} spaceBetween={30} slidesPerView={3}>
              {listCategory.map((category, i) => (
                <SwiperSlide key={i}>
                  <CategoryCard category={category} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Spin>
      </ProductPageStyle>
    </LayoutCommon>
  )
}

export default ProductPage

const CategoryCard = ({ category }) => {
  return (
    <div className="category-item">
      <div className="wrap-img">
        <Link to={`/menu/${category.id}`}>
          <img src={category.anh} alt={category.ten_san_pham} width={200} />
        </Link>
      </div>
      <Link to={`/product/${category.id}`}>
        <div className="product-name">{category.ten_loai_san_pham}</div>
      </Link>
    </div>
  )
}
