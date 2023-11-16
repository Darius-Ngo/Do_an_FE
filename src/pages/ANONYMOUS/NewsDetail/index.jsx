import { Col, Row } from "antd"
import { useEffect } from "react"
import LayoutCommon from "src/components/Common/Layout"
import Detail from "./component/Detail"
import { NewsDetailStyled } from "./styled"
const NewDetail = () => {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <NewsDetailStyled>
      <LayoutCommon>
        <Row gutter={[0, 24]} className="mt-24">
          <Col xs={24} md={24} lg={24} style={{ padding: "0 12px" }}>
            <Detail />
          </Col>
          {/* <Col xs={24} md={24} lg={8} style={{ padding: "0 12px" }}>
            <RelateToNews />
          </Col> */}
        </Row>
      </LayoutCommon>
    </NewsDetailStyled>
  )
}

export default NewDetail
