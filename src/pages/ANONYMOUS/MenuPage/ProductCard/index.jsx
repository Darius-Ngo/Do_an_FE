import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { ProductCardStyle } from "./styled.js"
import ROUTER from "src/router/index.js"
import { formatMoneyVND } from "src/lib/utils.js"

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
        <span className="ml-6">{formatMoneyVND(product.gia_ban_sizes)}</span>
      </div>
    </ProductCardStyle>
  )
}

export default ProductCard
