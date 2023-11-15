import { Col, Row } from "antd"
import LayoutCommon from "src/components/Common/Layout"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import ProductCard from "../../ProductDetail/components/ProductCard"
import { ProductPopularStyle } from "../styled"

const ProductPopular = ({ listProduct }) => {
  return (
    <ProductPopularStyle>
      <LayoutCommon>
        <div className="title-home">Sản phẩm bán chạy</div>
        <Row>
          <Col span={24}>
            <div className="product-list">
              <Swiper
                grabCursor={true}
                spaceBetween={30}
                slidesPerView={5}
                autoplay={{ delay: 2000 }}
                // navigation={true}
                modules={[Navigation, Autoplay]}
              >
                {listProduct.map((product, i) => (
                  <SwiperSlide key={i}>
                    <ProductCard product={product} isSmall={true} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Col>
        </Row>
        {/* <Col span={24} className="mt-20">
          <div className="list-product">
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
                          {formatMoneyVND(product.gia_ban_sizes)}
                        </div>
                      </div>
                      <div className="product-description max-line1">
                        <Rate
                          disabled
                          defaultValue={+product.danh_gia_trung_binh}
                          className="fs-13"
                          allowHalf
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Col> */}
      </LayoutCommon>
    </ProductPopularStyle>
  )
}
export default ProductPopular
