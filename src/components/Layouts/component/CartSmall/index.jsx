import { Tooltip, Empty, Spin } from "antd"
import { MdDeleteOutline } from "react-icons/md"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { CartSmallStyle } from "./styled"
import { useState } from "react"
import CartService from "src/services/CartService"
import { setListCart } from "src/redux/appGlobal"
import ROUTER from "src/router"
import { useNavigate } from "react-router-dom"
import Button from "src/components/MyButton/Button"
import { formatMoneyVND } from "src/lib/utils"

const CartSmall = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { listCart, userInfo } = useSelector(state => state.appGlobal)
  const [loading, setLoading] = useState(false)

  const getListCart = async id_nguoi_dung => {
    try {
      setLoading(true)
      const res = await CartService.getListCart({ id_nguoi_dung })
      if (res.isError) return
      dispatch(setListCart(res.Object))
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async id => {
    try {
      setLoading(true)
      const res = await CartService.deleteCart({
        cartIds: [id],
      })
      if (res.isError) return
      getListCart(userInfo.id)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CartSmallStyle>
      <Spin spinning={loading}>
        <div className="cart-title">Danh sách sản phẩm</div>
        <div className="cart-content">
          {listCart &&
            listCart?.map((item, index) => (
              <div className="cart-item" key={index}>
                <div className="cart-item__img">
                  <img src={item?.anh} alt={item?.ten_san_pham} width={30} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="cart-item__content">{item?.ten_san_pham}</div>
                  <div className="fs-10" style={{ color: "#e7b45a" }}>
                    x{item?.so_luong}, {item?.size}
                  </div>
                </div>
                <div className="cart-item__price">
                  {formatMoneyVND(item?.gia_ban * item?.so_luong)}
                </div>
                <Tooltip placement="right" title="Xóa sản phẩm" color="#f5222d">
                  <div
                    className="cart-item__delete"
                    onClick={() => handleDelete(item?.id)}
                  >
                    <MdDeleteOutline />
                  </div>
                </Tooltip>
              </div>
            ))}
          {!listCart.length && (
            <Empty
              image={
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/9bdd8040b334d31946f49e36beaf32db.png"
                  alt=""
                />
              }
              description={"Chưa có sản phẩm nào!"}
            />
          )}
        </div>
        {/* <div
          className="btn-order"
          onClick={() => navigate(ROUTER.CHI_TIET_GIO_HANG)}
        >
          <button>Đặt hàng ngay</button>
        </div> */}
        <div className="d-flex justify-content-flex-end pr-16 pl-16">
          <Button
            onClick={() => navigate(ROUTER.CHI_TIET_GIO_HANG)}
            btnType="red"
            className="text-right mt-12"
          >
            Giỏ hàng
          </Button>
        </div>
      </Spin>
    </CartSmallStyle>
  )
}

export default CartSmall
