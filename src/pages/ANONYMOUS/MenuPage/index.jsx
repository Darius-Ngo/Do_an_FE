import { Col, Divider, Row, Spin } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LayoutCommon from "src/components/Common/Layout/index.js"
import ROUTER from "src/router/index.js"
import CategoryService from "src/services/CategoryService"
import "./styled.js"
import { MenuPageStyle } from "./styled.js"
// import SwiperCore, { Autoplay, Navigation } from "swiper"
import { Autoplay, Navigation } from "swiper/modules"

import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import ProductCard from "../ProductDetail/components/ProductCard/index.jsx"
// import ProductCard from "./ProductCard/index.jsx"
const MenuPage = () => {
  // SwiperCore.use([Autoplay])

  const [loading, setLoading] = useState(false)
  const [listCategory, setListCategory] = useState([])
  const getList = async () => {
    try {
      setLoading(true)
      const res = await CategoryService.getListCategoryInHome()
      if (res.isError) return
      setListCategory(res.Object)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    window.scroll(0, 0)
    getList()
  }, [])

  return (
    <MenuPageStyle>
      <Spin spinning={loading}>
        {listCategory?.map((category, i) => (
          <CategoryItem
            key={i}
            category={category}
            lastChild={i === listCategory?.length - 1}
          />
        ))}
      </Spin>
    </MenuPageStyle>
  )
}

export default MenuPage

const CategoryItem = ({ category, lastChild }) => {
  const navigate = useNavigate()

  return (
    <LayoutCommon>
      <div className="category-row">
        <Row gutter={[16, 8]}>
          <Col span={16}>
            <div
              className="title-page"
              onClick={() =>
                navigate(ROUTER.DANH_SACH_SAN_PHAM, {
                  state: {
                    category,
                  },
                })
              }
            >
              {category.ten_loai_san_pham}
            </div>
            <div
              className="category-description"
              dangerouslySetInnerHTML={{
                __html: category.mo_ta,
              }}
            />
          </Col>
          <Col span={20}>
            <div className="product-list">
              <Swiper
                grabCursor={true}
                spaceBetween={30}
                slidesPerView={4}
                autoplay={{ delay: 2000 }}
                // navigation={true}
                modules={[Navigation, Autoplay]}
              >
                {category?.ds_san_pham?.map((product, i) => (
                  <SwiperSlide key={i}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {!lastChild && <Divider />}
          </Col>
        </Row>
      </div>
    </LayoutCommon>
  )
}
