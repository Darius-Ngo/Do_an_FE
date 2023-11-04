import { Badge, Card, Rate } from "antd"
import { CardProductStyle } from "./styled"
import { formatMoneyVND } from "src/lib/utils"
import ROUTER from "src/router"
import { useNavigate } from "react-router-dom"
const { Meta } = Card

const ProductCard = ({ hoverable = false, product }) => {
  const navigate = useNavigate()

  return (
    <CardProductStyle>
      <Badge.Ribbon
        text={product.isDiscord ? `-${product.giam_gia}%` : ""}
        color="volcano"
        style={!product.isDiscord && { display: "none" }}
      >
        <Card
          hoverable={hoverable}
          style={{
            width: 240,
          }}
          cover={<img alt="ảnh" src={product.anh} className="product-img" />}
          className="pointer"
          onClick={() =>
            navigate(ROUTER.CHI_TIET_SAN_PHAM, {
              state: {
                product,
              },
            })
          }
        >
          <Meta
            title={
              <div>
                <div className="product-name">{product.ten_san_pham}</div>
                <div className="rate-product">
                  <Rate
                    disabled
                    defaultValue={+product.danh_gia_trung_binh}
                    className="fs-13"
                    allowHalf
                  />
                  <div className="rate-count">
                    {product.tong_danh_gia} đánh giá
                  </div>
                </div>
                {product.isDiscord ? (
                  <div className="d-flex align-items-flex-end">
                    <div className="product-price fs-14 mt-8">
                      {formatMoneyVND(
                        product.gia_ban_sizes *
                          ((100 - product.giam_gia) / 100),
                      )}
                    </div>
                    <del className="fw-500 fs-12 ml-12 sub-color">
                      {formatMoneyVND(product.gia_ban_sizes)}
                    </del>
                  </div>
                ) : (
                  <div className="product-price fs-14 mt-8">
                    {formatMoneyVND(product.gia_ban_sizes)}
                  </div>
                )}
              </div>
            }
            // description="www.instagram.com"
          />
        </Card>
      </Badge.Ribbon>
    </CardProductStyle>
  )
}

export default ProductCard
