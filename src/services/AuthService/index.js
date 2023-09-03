import http from "../index"
import { apiLogin, apiLogout, apiRegister } from "./urls"

const login = body => http.post(apiLogin, body)
const register = body => http.post(apiRegister, body)
const logout = () => http.post(apiLogout)

const AuthService = {
  login,
  logout,
  register,
}
export default AuthService
