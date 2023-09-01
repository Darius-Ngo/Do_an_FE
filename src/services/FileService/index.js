import {
  apiUploadFile,
  apiUploadFileList,
  apiUploadListFileDossierSeaWeed,
  apiUploadFileBase64,
} from "./urls"
import http from "../index"

const uploadFile = body => http.post(apiUploadFile, body)
const uploadFileList = body => http.post(apiUploadFileList, body)
const uploadListFileDossierSeaWeed = body =>
  http.post(apiUploadListFileDossierSeaWeed, body)
const uploadFileBase64 = body => http.post(apiUploadFileBase64, body)

const FileService = {
  uploadFileList,
  uploadFile,
  uploadListFileDossierSeaWeed,
  uploadFileBase64,
}
export default FileService
