import http from "../index"
import {
  apiGetListCart,
  apiAddToCart,
  apiDeleteCart,
  apiCheckProductCart,
} from "./urls"

const getListCart = params => http.get(apiGetListCart, { params })
const checkProductCart = params => http.get(apiCheckProductCart, { params })
const addToCart = body => http.post(apiAddToCart, body)
const deleteCart = body => http.post(apiDeleteCart, body)

const CartService = {
  getListCart,
  checkProductCart,
  addToCart,
  deleteCart,
}
export default CartService
