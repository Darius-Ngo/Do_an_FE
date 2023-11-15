import { useState } from "react"
import Slider from "../Slider"
import ProductPopular from "./components/ProductPopular"
import { HomeStyled } from "./styled"
import content from "src/assets/images/home/home.png"
import ProductService from "src/services/ProductService"
import { useEffect } from "react"
import { Col, Row } from "antd"
import News from "./components/News"
import PostService from "src/services/PostService"
import OtherInfo from "./components/OtherInfo"

function HomePage() {
  const [loading, setLoading] = useState([])
  const [listProduct, setListProduct] = useState([])
  const [listPost, setListPost] = useState([])
  const getListProduct = async () => {
    try {
      setLoading(true)
      const res = await ProductService.getListProduct({
        id_loai_san_pham: 279,
      })
      if (res.isError) return
      setListProduct(res.Object?.data)
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
    getListProduct()
    getListPostHome()
  }, [])
  return (
    <HomeStyled className="d-flex flex-column align-items-center">
      <Slider />
      <News listPost={listPost} />
      <ProductPopular listProduct={listProduct} />
      <OtherInfo />
      {/* <img src={content} alt="" width={"100%"} /> */}
    </HomeStyled>
  )
}
export default HomePage
