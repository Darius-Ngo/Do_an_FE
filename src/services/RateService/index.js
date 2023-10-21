import http from "../index"
import { apiRateOrder, apiGetDetailDetail } from "./urls"

const rateOrder = body => http.post(apiRateOrder, body)
const getDetailDetail = params => http.get(apiGetDetailDetail, { params })

const RateService = {
  rateOrder,
  getDetailDetail,
}
export default RateService
