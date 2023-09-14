import { Spin, Col } from "antd"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Autoplay } from "swiper"
import React, { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getListProductStart, getCategoryByIdStart } from "../../redux"
import ProductCard from "./ProductCard"

import "./styles.scss"

const ProductPage = ({ listCategory }) => {
  SwiperCore.use([Autoplay])
  const { id } = useParams()
  const dispatch = useDispatch()
  const {
    status,
    data: { listProduct, categoryDetail },
  } = useSelector(state => state.userPage)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (id) {
      dispatch(getListProductStart(id))
      dispatch(getCategoryByIdStart(id))
    }
  }, [id])

  return (
    <div className="container-product-page">
      <Spin spinning={status === "loading"}>
        <div className="container-product-page_content">
          <Col span={16}>
            <div className="category-title mb-1 ">
              {categoryDetail?.ten_loai_san_pham}
            </div>
            <div className="category-description">{categoryDetail?.mo_ta}</div>
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
                    <ProductCard product={product}></ProductCard>
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
                <CategoryCard category={category}></CategoryCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Spin>
    </div>
  )
}

export default ProductPage

const CategoryCard = props => {
  const { category } = props

  return (
    <div className="category-item">
      <div className="wrap-img">
        <Link to={`/menu/${category.id}`}>
          <img src={category.anh} alt={category.ten_san_pham} />
        </Link>
      </div>
      <Link to={`/product/${category.id}`}>
        <div className="product-name">{category.ten_loai_san_pham}</div>
      </Link>
    </div>
  )
}
