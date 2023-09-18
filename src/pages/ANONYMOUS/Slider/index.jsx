import slider_1 from "src/assets/images/slider/home-1-slider.jpg"
import slider_2 from "src/assets/images/slider/home-2-slider.jpg"
import slider_3 from "src/assets/images/slider/home-3-slider.jpg"
import slider_4 from "src/assets/images/slider/home-4-slider.jpg"
import icon_1 from "src/assets/images/slider/icon-slide-1.png"
import icon_2 from "src/assets/images/slider/icon-slide-2.png"
import icon_3 from "src/assets/images/slider/icon-slide-3.png"
import icon_4 from "src/assets/images/slider/icon-slide-4.png"
import { Autoplay, Pagination, Navigation } from "swiper/modules"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css/navigation"
import "swiper/css/pagination"

import "./styles.scss"
import SvgIcon from "src/components/SvgIcon"
import { useNavigate } from "react-router-dom"
import ROUTER from "src/router"

const list = [
  {
    anh: slider_1,
    icon: icon_1,
    title: "CHẤT LƯỢNG HÀNG ĐẦU",
    description: "Tự hào là thương hiệu số một về cà phê chất lượng",
    id: 1,
  },
  {
    anh: slider_2,
    icon: icon_2,
    title: "CHẤT LƯỢNG HÀNG ĐẦU",
    description: "Tự hào là thương hiệu số một về cà phê chất lượng",
    id: 2,
  },
  {
    anh: slider_3,
    icon: icon_3,
    title: "CHẤT LƯỢNG HÀNG ĐẦU",
    description: "Tự hào là thương hiệu số một về cà phê chất lượng",
    id: 3,
  },
  {
    anh: slider_4,
    icon: icon_4,
    title: "CHẤT LƯỢNG HÀNG ĐẦU",
    description: "Tự hào là thương hiệu số một về cà phê chất lượng",
    id: 4,
  },
]

const Slider = () => {
  // SwiperCore.use([Autoplay, Pagination, Navigation])

  return (
    <div className="wrap-slider">
      <Swiper
        navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Navigation, Autoplay, Pagination]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {list.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => <SliderItem item={item} active={isActive} />}
          </SwiperSlide>
        ))}
      </Swiper>
      <SvgIcon name="border" className="footer-slider" />
    </div>
  )
}

export default Slider

const SliderItem = ({ active, item }) => {
  const navigate = useNavigate()
  return (
    <div
      className={`slide-item ${active ? "active" : ""}`}
      style={{ backgroundImage: `url(${item.anh})` }}
    >
      <img src={item.icon} alt="" className="slide-item_icon" />
      <div className="slide-item_title">{item.title}</div>
      <div className="slide-item_description">{item.description}</div>
      <div className="slide-item_btn" onClick={() => navigate(ROUTER.THUC_DON)}>
        MUA NGAY
      </div>
    </div>
  )
}
