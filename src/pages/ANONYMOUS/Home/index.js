import { HomeStyled } from "./styled"
// import bannerTop from "src/assets/images/home/bannerTop.png"
// import content from "src/assets/images/home/Content.png"
import content from "src/assets/images/home/Trangchu.png"

function HomePage() {
  return (
    <HomeStyled className="d-flex flex-column align-items-center">
      {/* <img src={bannerTop} alt="" width={"100%"} /> */}
      <img src={content} alt="" width={"100%"} />
    </HomeStyled>
  )
}
export default HomePage
