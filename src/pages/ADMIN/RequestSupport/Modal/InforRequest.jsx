import { Col, Row, Input, Button } from "antd"
import moment from "moment"
import { statusColor } from "./../index"
import { STATUS_REQUEST } from "src/constants/constants"
const InforRequest = ({ detailContact }) => {
  return (
    <Row className={"bd-infor "}>
      <Col span={12} className="mb-16">
        <span className="title-field">Người yêu cầu:</span>{" "}
        {detailContact?.ho_ten}
      </Col>
      <Col span={12} className="mb-16">
        <span className="title-field">Mã yêu cầu:</span> {detailContact?.ma_yc}
      </Col>
      <Col span={12} className="mb-16">
        <span className="title-field">Email:</span> {detailContact?.email}
      </Col>
      <Col span={12} className="mb-16">
        <span className="title-field">Trạng thái:</span>{" "}
        <span
          style={{
            color: `${statusColor[detailContact?.trang_thai - 1]}`,
            fontWeight: "600",
          }}
        >
          {
            STATUS_REQUEST?.find(
              i => i?.CodeValue === detailContact?.trang_thai,
            )?.Description
          }
        </span>
      </Col>
      <Col span={12} className="mb-16">
        <span className="title-field">Số điện thoại:</span> {detailContact?.sdt}
      </Col>
      <Col span={12} className="mb-16">
        <span className="title-field">Người hỗ trợ:</span>{" "}
        {detailContact?.ten_nguoi_ht}
      </Col>
      <Col span={12} className="mb-16">
        <span className="title-field">Thời gian yêu cầu:</span>{" "}
        {detailContact?.thoi_gian_yc
          ? moment(detailContact?.thoi_gian_yc).format("DD/MM/YYYY HH:mm")
          : ""}
      </Col>
      <Col span={12} className="mb-16">
        <span className="title-field">Thời gian hỗ trợ: </span>
        {detailContact?.thoi_gian_ht
          ? moment(detailContact?.thoi_gian_ht).format("DD/MM/YYYY HH:mm")
          : ""}
      </Col>
    </Row>
  )
}

export default InforRequest
