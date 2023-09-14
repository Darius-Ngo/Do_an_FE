import React from "react"
import { Link } from "react-router-dom"
import { BASE_URL } from "../../../../../core/constant"
import "./styles.scss"

const ProductCard = props => {
  const { product } = props

  return (
    <div className="product-item">
      <div className="wrap-img">
        <Link to={`/product/${product.id}`}>
          <img src={`${BASE_URL}${product.anh}`} alt={product.ten_san_pham} />
        </Link>
      </div>
      <Link to={`/product/${product.id}`}>
        <div className="product-name">{product.ten_san_pham}</div>
      </Link>
      <div className="product-price">
        Giá{" "}
        <span>
          :{" "}
          {product.giaBanSizeS?.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
    </div>
  )
}

export default ProductCard
