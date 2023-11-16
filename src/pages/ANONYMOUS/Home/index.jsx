import { useEffect, useState } from "react"
import PostService from "src/services/PostService"
import ProductService from "src/services/ProductService"
import Slider from "../Slider"
import News from "./components/News"
import OtherInfo from "./components/OtherInfo"
import ProductPopular from "./components/ProductPopular"
import { HomeStyled } from "./styled"
import SpinCustom from "src/components/Spin"

function HomePage() {
  const [loading, setLoading] = useState([])
  const [listProduct, setListProduct] = useState([])
  const [listPost, setListPost] = useState([])
  const getListProductTrend = async () => {
    try {
      setLoading(true)
      const res = await ProductService.getListProductTrend()
      if (res.isError) return
      setListProduct(res.Object)
    } finally {
      setLoading(false)
    }
  }
  const getListPostHome = async () => {
    try {
      setLoading(true)
      const res = await PostService.getListPostHome({
        currentPage: 1,
        pageSize: 3,
      })
      if (res.isError) return
      setListPost(res.Object?.data)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getListProductTrend()
    getListPostHome()
  }, [])
  return (
    <HomeStyled className="d-flex flex-column align-items-center">
      <Slider />
      <SpinCustom spinning={loading}>
        <News listPost={listPost} />
        <ProductPopular listProduct={listProduct} />
        <OtherInfo />
      </SpinCustom>
      {/* <img src={content} alt="" width={"100%"} /> */}
    </HomeStyled>
  )
}
export default HomePage
