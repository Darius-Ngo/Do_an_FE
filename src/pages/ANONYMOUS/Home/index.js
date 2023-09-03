import { HomeStyled } from "./styled"
import content from "src/assets/images/home/home.png"

function HomePage() {
  return (
    <HomeStyled className="d-flex flex-column align-items-center">
      <img src={content} alt="" width={"100%"} />
    </HomeStyled>
  )
}
export default HomePage
