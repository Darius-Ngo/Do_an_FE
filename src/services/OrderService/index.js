import http from "../index"
import {
  apiGetTotalStatus,
  apiGetListOrderUser,
  apiGetListOrderManager,
  apiAddOrder,
  apiGetDetailOrder,
  apiUpdateStatus,
  apiGetDetailUpdate,
  apiGetListAddressOrder,
  apiAddAddress,
  apiUpdateAddress,
  apiDeleteAddress,
} from "./urls"

const getTotalStatus = params => http.get(apiGetTotalStatus, { params })
const getListOrderUser = params => http.get(apiGetListOrderUser, { params })
const getListOrderManager = params =>
  http.get(apiGetListOrderManager, { params })
const getDetailOrder = params => http.get(apiGetDetailOrder, { params })
const addOrder = body => http.post(apiAddOrder, body)
const updateStatus = body => http.post(apiUpdateStatus, body)
const getDetailUpdate = params => http.get(apiGetDetailUpdate, { params })

const getListAddressOrder = params =>
  http.get(apiGetListAddressOrder, { params })
const addAddress = body => http.post(apiAddAddress, body)
const updateAddress = body => http.post(apiUpdateAddress, body)
const deleteAddress = body => http.patch(apiDeleteAddress, body)

const OrderService = {
  getTotalStatus,
  getListOrderUser,
  getListOrderManager,
  getDetailOrder,
  addOrder,
  updateStatus,
  getDetailUpdate,
  getListAddressOrder,
  addAddress,
  updateAddress,
  deleteAddress,
}
export default OrderService
