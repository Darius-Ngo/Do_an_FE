import { apiUploadFileImage } from "./urls"
import http from "../index"

const uploadFileImage = body => http.post(apiUploadFileImage, body)

const FileService = {
  uploadFileImage,
}
export default FileService
