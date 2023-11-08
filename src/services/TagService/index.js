import {
  apiGetListTags,
  apiGetListCombobox,
  apiAddTags,
  apiUpdateTags,
  apiDeleteTags,
  apiChangeStatus,
} from "./urls"
import http from "../index"

const getListTags = body => http.post(apiGetListTags, body)
const getListCombobox = () => http.get(apiGetListCombobox)
const addTags = body => http.post(apiAddTags, body)
const updateTags = body => http.put(apiUpdateTags, body)
const deleteTags = params => http.delete(apiDeleteTags, { params })
const changeStatus = body => http.post(apiChangeStatus, body)

const TagService = {
  getListTags,
  getListCombobox,
  addTags,
  updateTags,
  deleteTags,
  changeStatus,
}
export default TagService
