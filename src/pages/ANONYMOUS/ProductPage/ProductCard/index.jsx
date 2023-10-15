import React from "react"
import { Link } from "react-router-dom"
import { ProductCardStyle } from "./styled.js"
import { formatMoneyVND } from "src/lib/utils.js"

const ProductCard = ({ product }) => {
  return (
    <ProductCardStyle>
      <div className="wrap-img">
        <Link to={`/product/${product.id}`}>
          <img src={product.anh} alt={product.ten_san_pham} />
        </Link>
      </div>
      <Link to={`/product/${product.id}`}>
        <div className="product-name">{product.ten_san_pham}</div>
      </Link>
      <div className="product-price">
        Giá <span>: {formatMoneyVND(product.giaBanSizeS)}</span>
      </div>
    </ProductCardStyle>
  )
}

export default ProductCard
