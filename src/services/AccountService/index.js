import http from "../index"
import {
  apiGetListUser,
  apiGetDetailUser,
  apiAddUser,
  apiUpdateUser,
  apiDeleteUser,
  apiChangeStatus,
  apiResetPassword,
} from "./urls"

const getListUser = body => http.post(apiGetListUser, body)
const getDetailUser = id => http.get(apiGetDetailUser + `/${id}`)
const addUser = body => http.post(apiAddUser, body)
const changeStatus = body => http.post(apiChangeStatus, body)
const resetPassword = body => http.post(apiResetPassword, body)
const updateUser = body => http.put(apiUpdateUser, body)
const deleteUser = id => http.delete(apiDeleteUser + `/${id}`)

const AccountService = {
  getListUser,
  getDetailUser,
  addUser,
  updateUser,
  deleteUser,
  changeStatus,
  resetPassword,
}
export default AccountService
