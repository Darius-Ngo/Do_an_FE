import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { ProductCardStyle } from "./styled.js"
import ROUTER from "src/router/index.js"

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  return (
    <ProductCardStyle
      onClick={() =>
        navigate(ROUTER.CHI_TIET_SAN_PHAM, {
          state: {
            product,
          },
        })
      }
    >
      <div className="wrap-img">
        <img src={product.anh} alt={product.ten_san_pham} width={"100%"} />
      </div>
      <div className="product-name">{product.ten_san_pham}</div>
      <div className="product-price">
        Giá:
        <span className="ml-6">
          {product.gia_ban_sizes?.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
    </ProductCardStyle>
  )
}

export default ProductCard
