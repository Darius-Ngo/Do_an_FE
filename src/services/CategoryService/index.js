import http from "../index"
import {
  apiGetListCategory,
  apiGetDetailCategory,
  apiAddCategory,
  apiUpdateCategory,
  apiDeleteCategory,
  apiChangeStatus,
} from "./urls"

const getListCategory = body => http.post(apiGetListCategory, body)
const getDetailCategory = id => http.get(apiGetDetailCategory + `/${id}`)
const addCategory = body => http.post(apiAddCategory, body)
const changeStatus = body => http.post(apiChangeStatus, body)
const updateCategory = body => http.put(apiUpdateCategory, body)
const deleteCategory = id => http.delete(apiDeleteCategory + `/${id}`)

const CategoryService = {
  getListCategory,
  getDetailCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  changeStatus,
}
export default CategoryService
