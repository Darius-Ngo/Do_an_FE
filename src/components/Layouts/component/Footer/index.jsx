import { Col, Row } from "antd"
import LayoutCommon from "src/components/Common/Layout"
import SvgIcon from "src/components/SvgIcon"
import { InfoContact } from "src/constants/constants"
import { FooterStyled } from "./styled"

const Footer = () => {
  return (
    <FooterStyled>
      <div className="content-footer mt-30">
        <SvgIcon
          name="border-white-bt"
          style={{ transform: "rotate(180deg)", position: "relative", top: -1 }}
          className="mb-50"
        />
        <LayoutCommon>
          <Row gutter={24}>
            <Col span={7}>
              <div className="fs-16 fw-600 text-uppercase mb-24">
                Thời gian hoạt động
              </div>
              <div className="d-flex align-items-center mb-16">
                <div className="fw-600">Ngày:</div>
                <div className="ml-8">Tất cả các ngày trong tuần</div>
              </div>
              <div className="d-flex align-items-center mb-16">
                <div className="fw-600">Giờ mở cửa:</div>
                <div className="ml-8">8:00 - 22:00</div>
              </div>
            </Col>
            <Col span={9}>
              <div className="fs-16 fw-600 text-uppercase mb-24">Liên hệ</div>

              <div className="d-flex align-items-center mb-16">
                <div className="fw-600">Số điện thoại:</div>
                <div className="ml-8">{InfoContact.phone}</div>
              </div>
              <div className="d-flex align-items-center mb-16">
                <div className="fw-600">Email:</div>
                <div className="ml-8">{InfoContact.email}</div>
              </div>
              <div className="d-flex align-items-flex-start mb-16">
                <div className="fw-600" style={{ whiteSpace: "nowrap" }}>
                  Địa chỉ:
                </div>
                <div className="ml-8">{InfoContact.address}</div>
              </div>
            </Col>
            <Col span={8}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232.81937936256054!2d105.79891743933324!3d20.98822448756396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad450b2a50ad%3A0x214b27d1f2babe6d!2sHighlands%20Coffee%20Nguy%E1%BB%85n%20Tr%C3%A3i!5e0!3m2!1svi!2s!4v1700103746697!5m2!1svi!2s"
                width={"100%"}
                // height={200}
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </Col>
          </Row>
        </LayoutCommon>
      </div>
      <div className="end-page">
        © 2023 Bản quyền thuộc về NGÔ VĂN LONG - 70DCTT21222
      </div>
    </FooterStyled>
  )
}

export default Footer
