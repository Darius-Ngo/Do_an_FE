import { Col, Row, Spin } from "antd"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CategoryService from "src/services/CategoryService"
import "./styled.js"
import { useEffect } from "react"
import { MenuPageStyle } from "./styled.js"
import ROUTER from "src/router/index.js"
import LayoutCommon from "src/components/Common/Layout/index.js"

const MenuPage = () => {
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
    getList()
  }, [])
  return (
    <MenuPageStyle>
      <Spin spinning={loading}>
        {listCategory?.map((category, i) => (
          <CategoryItem key={i} category={category} />
        ))}
      </Spin>
    </MenuPageStyle>
  )
}

export default MenuPage

const CategoryItem = props => {
  const { category } = props
  const navigate = useNavigate()

  return (
    <LayoutCommon>
      <div className="category-row">
        <Row gutter={[16, 8]}>
          <Col span={24}>
            <div className="category-title">{category.ten_loai_san_pham}</div>
          </Col>
          <Col
            span={16}
            className="mb-3 category-info"
            // onClick={() =>
            //   navigate(ROUTER.DANH_SACH_SAN_PHAM, {
            //     state: category,
            //   })
            // }
          >
            <div className="category-img">
              <img
                src={category.anh}
                alt=""
                width={"100%"}
                onClick={() =>
                  navigate(ROUTER.DANH_SACH_SAN_PHAM, {
                    state: {
                      category,
                    },
                  })
                }
              />
            </div>
            <div
              className="category-description"
              dangerouslySetInnerHTML={{
                __html: category.mo_ta,
              }}
            />
            <button
              className="btn-show-product"
              onClick={() =>
                navigate(ROUTER.DANH_SACH_SAN_PHAM, {
                  state: {
                    category,
                  },
                })
              }
            >
              XEM SẢN PHẨM
            </button>
          </Col>
          <Col span={8}>
            {category?.ds_san_pham?.slice(0, 3)?.map((product, i) => (
              <div
                className="box-product"
                key={product.id}
                onClick={() =>
                  navigate(ROUTER.CHI_TIET_SAN_PHAM, {
                    state: {
                      product,
                    },
                  })
                }
              >
                <img
                  src={product.anh}
                  alt={product.ten_san_pham}
                  className="wrap-img"
                />
                <div className="product-info">
                  <div className="product-info_name">
                    {product.ten_san_pham}
                  </div>
                  <div
                    className="product-info_description"
                    dangerouslySetInnerHTML={{
                      __html: product.mo_ta,
                    }}
                  />
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </LayoutCommon>
  )
}
