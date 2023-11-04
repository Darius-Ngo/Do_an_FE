import http from "../index"
import {
  apiGetListPost,
  apiGetDetailPost,
  apiAddPost,
  apiUpdatePost,
  apiDeletePost,
  apiChangeStatus,
  apiGetListPostHome,
  apiGetDetailPostHome,
} from "./urls"

const getListPost = body => http.post(apiGetListPost, body)
const getDetailPost = params => http.get(apiGetDetailPost, { params })
const addPost = body => http.post(apiAddPost, body)
const updatePost = body => http.put(apiUpdatePost, body)
const deletePost = params => http.delete(apiDeletePost, { params })
const changeStatus = body => http.post(apiChangeStatus, body)
const getListPostHome = body => http.post(apiGetListPostHome, body)
const getDetailPostHome = body => http.post(apiGetDetailPostHome, body)

const PostService = {
  getListPost,
  getDetailPost,
  addPost,
  updatePost,
  deletePost,
  changeStatus,
  getListPostHome,
  getDetailPostHome,
}
export default PostService
