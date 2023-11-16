import http from "../index"
import {
  apiLogin,
  apiLogout,
  apiRegister,
  apiChangePassWord,
  apiForgetPassWord,
  apiConfirmOTP,
} from "./urls"

const login = body => http.post(apiLogin, body)
const register = body => http.post(apiRegister, body)
const changePassWord = body => http.post(apiChangePassWord, body)
const forgetPassWord = body => http.post(apiForgetPassWord, body)
const confirmOTP = body => http.post(apiConfirmOTP, body)
const logout = () => http.post(apiLogout)

const AuthService = {
  login,
  logout,
  register,
  changePassWord,
  forgetPassWord,
  confirmOTP,
}
export default AuthService
