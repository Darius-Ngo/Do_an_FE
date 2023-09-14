import { Col, InputNumber, Radio, Rate, Row, Spin, Tabs } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { animateScroll as scroll } from "react-scroll"
import LayoutCommon from "src/components/Common/Layout"
import { setOpenLoginModal } from "src/redux/loginModal"
import ROUTER from "src/router"
import ProductService from "src/services/ProductService"
import SwiperCore, { Autoplay } from "swiper"
import { ProductDetailStyle, TabsStyled } from "./styled"

const ProductDetail = () => {
  SwiperCore.use([Autoplay])
  const { userInfo } = useSelector(state => state?.appGlobal)
  const { product } = useLocation().state
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [productDetail, setProductDetail] = useState({})
  const [listProduct, setListProduct] = useState([])
  const [tabActive, setTabActive] = useState(1)
  const [sizeSelect, setSizeSelect] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState()
  const onSelectSize = size => {
    setSizeSelect(size.target.value)
  }

  const getListProduct = async () => {
    try {
      setLoading(true)
      const res = await ProductService.getListProduct({
        id_loai_san_pham: product.id_loai_san_pham,
      })
      if (res.isError) return
      setListProduct(res.Object?.data)
    } finally {
      setLoading(false)
    }
  }
  const getDetail = async () => {
    try {
      setLoading(true)
      const res = await ProductService.getDetailProduct(product.id)
      if (res.isError) return
      setProductDetail(res.Object)
    } finally {
      setLoading(false)
    }
  }

  const handleOrder = () => {
    if (userInfo.id && productDetail) {
      const body = {
        id_san_pham: productDetail?.id,
        kich_co: sizeSelect,
        so_luong: quantity,
        id_nguoi_dung: userInfo.id,
      }
    } else {
      dispatch(setOpenLoginModal(true))
    }
  }

  useEffect(() => {
    scroll.scrollToTop({
      duration: 1000, // Thời gian cuộn mượt (milliseconds)
      smooth: "easeInOutQuint", // Loại hiệu ứng cuộn
    })
    window.scrollTo(0, 0)
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Thêm behavior này để tạo hiệu ứng cuộn mượt
    })
    getDetail()
    getListProduct()
  }, [product])

  useEffect(() => {
    switch (sizeSelect) {
      case 1:
        return setPrice(productDetail.gia_ban_sizes)
      case 2:
        return setPrice(productDetail.gia_ban_sizem)
      case 3:
        return setPrice(productDetail.gia_ban_sizel)
      default:
        return setPrice(productDetail.gia_ban_sizes)
    }
  }, [sizeSelect, productDetail])

  const options = [
    { label: "S", value: 1 },
    { label: "M", value: 2 },
    { label: "L", value: 3 },
  ]
  const items = [
    {
      label: "Mô tả ",
      key: 1,
      children: (
        <div
          className="product-description"
          style={{ width: "70%" }}
          dangerouslySetInnerHTML={{
            __html: productDetail.mo_ta,
          }}
        />
      ),
    },
    {
      label: "Đánh giá ",
      key: 2,
      children: null,
    },
  ]
  return (
    <ProductDetailStyle>
      <Spin spinning={loading}>
        <div className="container-product-detail-page_content">
          <LayoutCommon>
            <Row gutter={16}>
              <Col span={4}></Col>
              <Col span={8}>
                <div className="wrap-img">
                  <img
                    src={productDetail?.anh}
                    alt={productDetail?.ten_san_pham}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="wrap-content">
                  <div>
                    <div className="product-detail-title">
                      {productDetail?.ten_san_pham}
                    </div>
                    <Rate
                      disabled
                      defaultValue={4.5}
                      allowHalf
                      className="mt-8 mb-10"
                    />
                    <div className="product-description">
                      <div className="fw-600">Thành phần chính:</div>
                      {productDetail?.ghi_chu
                        ?.split(",")
                        ?.slice(0, 4)
                        ?.map((i, idx) => (
                          <div key={idx} className="fs-14">
                            - {i}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <div className="product-option">
                      <div className="option-size">
                        <div className="fs-16 fw-600 mr-6 title-item">
                          Size:{" "}
                        </div>
                        <Radio.Group
                          options={options}
                          onChange={onSelectSize}
                          value={sizeSelect}
                          optionType="button"
                        />
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="fs-16 fw-600 mr-6 title-item">
                          Giá:{" "}
                        </div>
                        <div className="product-price">
                          <strong>
                            {price?.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </strong>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="fs-16 fw-600 mr-6 title-item">
                          Số lượng:{" "}
                        </div>
                        <div className="change-quality">
                          <button
                            className="btn-change"
                            disabled={quantity === 1}
                            onClick={() => setQuantity(quantity - 1)}
                          >
                            -
                          </button>
                          {/* <Input
                          className="input-change"
                          value={quantity}
                          onChange={text => setQuantity(text.target.value)}
                        /> */}
                          <InputNumber
                            className="input-change"
                            value={quantity}
                            onChange={value => setQuantity(value)}
                            min={1}
                            max={100}
                            step={1}
                            keyboard={false}
                            // formatter={value => `${value}%`}
                            // parser={value => value.replace("%", "")}
                          />
                          <button
                            className="btn-change"
                            disabled={quantity >= 100}
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="btn-order" onClick={handleOrder}>
                      THÊM VÀO GIỎ
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </LayoutCommon>
          <Col span={24} className="mt-20">
            <div className="list-product">
              <LayoutCommon>
                <div className="heading">Sản phẩm tương tự</div>
                <Row gutter={40}>
                  {listProduct.map((product, i) => (
                    <Col span={12} key={`pr_${product.id}`}>
                      <div className="d-flex align-items-center justify-content-flex-start mb-40">
                        <img
                          src={product.anh}
                          alt={product.ten_san_pham}
                          width={70}
                          className="pointer"
                          onClick={() => {
                            window.scrollTo(0, 0)
                            navigate(ROUTER.CHI_TIET_SAN_PHAM, {
                              state: {
                                product,
                              },
                            })
                          }}
                        />
                        <div className="w-100">
                          <div className="d-flex align-items-flex-end ">
                            <div
                              className="product-name"
                              onClick={() => {
                                window.scrollTo(0, 0)
                                navigate(ROUTER.CHI_TIET_SAN_PHAM, {
                                  state: {
                                    product,
                                  },
                                })
                              }}
                            >
                              {product.ten_san_pham}
                            </div>
                            <div className="line"></div>
                            <div className="product-price">
                              {product.gia_ban_sizes?.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </div>
                          </div>
                          <div className="product-description max-line1">
                            {`Một sản phẩm tuyệt vời được tạo lên từ: ${product.ghi_chu}`}
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </LayoutCommon>
            </div>
          </Col>
          <LayoutCommon>
            <Col span={24} className="mt-40" style={{ minHeight: 300 }}>
              <TabsStyled>
                <Tabs
                  activeKey={tabActive}
                  onChange={key => setTabActive(prev => key)}
                  items={items}
                />
              </TabsStyled>
            </Col>
          </LayoutCommon>
          <Col span={24}></Col>
        </div>
      </Spin>
    </ProductDetailStyle>
  )
}

export default ProductDetail
