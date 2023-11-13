import { Col, Row } from "antd"
import Hotline from "src/assets/images/home/Contact/hotline.svg"
import IconAddress from "src/assets/images/home/Contact/icon-address.svg"
import SMSonline from "src/assets/images/home/Contact/smsonline.svg"
import { ContactStyled } from "../styled"
const ContactInfo = () => {
  return (
    <ContactStyled>
      <Row gutter={[24, 24]}>
        <Col md={8} xs={24}>
          <div className="contact-box">
            <Row
              gutter={[24, 24]}
              style={{ flexWrap: "nowrap", margin: 0 }}
              className="align-items-center justify-content-space-between contact-box-content"
            >
              <Col>
                <div className="contact-type">Địa chỉ</div>
                <div className="contact-address">
                  Tầng 5, 115 Trần Duy Hưng, Trung Hòa, Cầu Giấy, Hà Nội
                </div>
              </Col>
              <Col>
                <img src={IconAddress} alt="IconAddress" loading="lazy" />
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={8} xs={24}>
          <div className="contact-box contact-box__hotline-background">
            <Row
              gutter={24}
              style={{ flexWrap: "nowrap", margin: 0 }}
              className="align-items-center justify-content-space-between contact-box-content"
            >
              <Col>
                <div className="contact-type">Đường dây nóng</div>
                <div className="hotline-text">0869.100.317</div>
              </Col>
              <Col>
                <img src={Hotline} alt="Hotline" loading="lazy" />
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={8} xs={24}>
          <div className="contact-box">
            <Row
              gutter={24}
              style={{ flexWrap: "nowrap", margin: 0 }}
              className="align-items-center justify-content-space-between contact-box-content"
            >
              <Col>
                <div className="contact-type">Hộp thư điện tử</div>
                <div className="contact-address">cafebaton@gmail.com</div>
              </Col>
              <Col>
                <img src={SMSonline} alt="SMSonline" loading="lazy" />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </ContactStyled>
  )
}
export default ContactInfo
