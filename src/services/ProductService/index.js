import http from "../index"
import {
  apiGetListProduct,
  apiGetDetailProduct,
  apiGetProductByCategoryID,
  apiAddProduct,
  apiUpdateProduct,
  apiDeleteProduct,
  apiChangeStatus,
  apiGetListProductTrend,
} from "./urls"

const getListProduct = body => http.post(apiGetListProduct, body)
const getDetailProduct = id => http.get(apiGetDetailProduct + `/${id}`)
const getProductByCategoryID = id =>
  http.get(apiGetProductByCategoryID + `/${id}`)
const addProduct = body => http.post(apiAddProduct, body)
const changeStatus = body => http.post(apiChangeStatus, body)
const updateProduct = body => http.put(apiUpdateProduct, body)
const getListProductTrend = params =>
  http.get(apiGetListProductTrend, { params })
const deleteProduct = id => http.delete(apiDeleteProduct + `/${id}`)

const ProductService = {
  getListProduct,
  getDetailProduct,
  getProductByCategoryID,
  addProduct,
  updateProduct,
  deleteProduct,
  changeStatus,
  getListProductTrend,
}
export default ProductService
