import { Col, Image, Row } from "antd"
import LayoutCommon from "src/components/Common/Layout"
import { OtherInfoStyle } from "../styled"
import img1 from "src/assets/images/home/machine/img-1.png"
import img2 from "src/assets/images/home/machine/img-2.png"
import img3 from "src/assets/images/home/machine/img-3.png"
import img4 from "src/assets/images/home/machine/img-4.png"
import slide1 from "src/assets/images/home/slide/slider-1.jpg"
import slide2 from "src/assets/images/home/slide/slider-2.jpg"
import slide3 from "src/assets/images/home/slide/slider-3.jpg"
import slide4 from "src/assets/images/home/slide/slider-4.jpg"
import { Swiper, SwiperSlide } from "swiper/react"
import { FAILBACK } from "src/constants/constants"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import SvgIcon from "src/components/SvgIcon"
import ROUTER from "src/router"
import { ArrowRightOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
const OtherInfo = () => {
  const navigate = useNavigate()
  const listDataMachine = [
    {
      img: img1,
      title: "Máy pha cafe",
      description:
        "Máy pha cafe của chúng tôi giúp tối ưu hóa việc chiết xuất tinh chất từ hạt cafe, mang đến cho bạn cốc cafe có độ đậm vừa phải, hương thơm nồng nàn và vị ngon đặc trưng.",
    },
    {
      img: img2,
      title: "Máy nghiền cafe",
      description:
        "Với thiết kế hiện đại và khả năng điều chỉnh mịn độ bột, máy nghiền cafe của chúng tôi sẽ giúp bạn tận hưởng hương vị tuyệt vời từ những hạt cafe tươi ngon nhất. ",
    },
    {
      img: img3,
      title: "Bộ Lọc cafe",
      description:
        "Với công nghệ tiên tiến, bộ lọc của chúng tôi giúp tách lọc mịn nhất từ hạt cafe, mang đến cho bạn cốc cafe ngon đúng chuẩn. ",
    },
    {
      img: img4,
      title: "Máy pha cafe ESPRESSO ",
      description:
        "Công nghệ hiện đại và khả năng tinh chỉnh linh hoạt, máy pha chế của chúng tôi cam kết mang đến trải nghiệm cafe tối ưu, với hương vị đặc trưng và độ hấp dẫn mà bạn đang tìm kiếm.",
    },
  ]
  return (
    <OtherInfoStyle>
      <div style={{ backgroundColor: "rgba(0,0,0,0.1)" }} className="pb-50">
        <SvgIcon
          name="border-white-bt"
          style={{ transform: "rotate(180deg)" }}
          className="mb-50"
        />
        <LayoutCommon>
          <Col span={24}>
            <Row gutter={0}>
              <Col span={12}>
                <div className="left-slide">
                  <img src={slide1} alt="" style={{ width: "100%" }} />
                  <div className="content-slide d-flex flex-column justify-content-space-between">
                    <div>
                      <div className="title-slide text-uppercase">
                        Thưởng thức sản phẩm và <br /> dịch vụ chất lượng cao
                      </div>
                      <div
                        className="fs-14 fw-600 mt-30"
                        style={{ width: "70%" }}
                      >
                        Chúng tôi cam kết mang đến cho bạn không gian thoải mái
                        và dịch vụ chuyên nghiệp nhất, cùng với hương vị cafe
                        đặc trưng mà bạn chỉ có thể tìm thấy ở đây.
                      </div>
                    </div>
                    <div
                      className="fs-16 d-flex align-items-center fw-600 pointer"
                      onClick={() => {
                        window.scrollTo({ top: 0, left: 0 })
                        navigate(ROUTER.TIN_TUC)
                      }}
                    >
                      Đọc thêm <ArrowRightOutlined className="ml-8" />
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <Swiper
                  direction={"vertical"}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img src={slide2} alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={slide3} alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={slide4} alt="" />
                  </SwiperSlide>
                </Swiper>
              </Col>
            </Row>
          </Col>
        </LayoutCommon>
      </div>
      <SvgIcon
        name="border"
        style={{ transform: "rotate(180deg)" }}
        className="icon-gray"
      />
      <div className="pt-50 pb-50">
        <LayoutCommon>
          <div className="title-home">Thiết bị hiện đại</div>
          <Row gutter={36}>
            {listDataMachine.map((i, idx) => (
              <Col span={6} key={idx} className="text-center">
                <Image preview={false} src={i.img} fallback={FAILBACK} />
                <div className="fw-600 fs-16 mt-16 mb-16 text-uppercase">
                  {i.title}
                </div>
                <div className="" style={{ lineHeight: 1.5 }}>
                  {i.description}
                </div>
              </Col>
            ))}
          </Row>
        </LayoutCommon>
      </div>
    </OtherInfoStyle>
  )
}
export default OtherInfo
