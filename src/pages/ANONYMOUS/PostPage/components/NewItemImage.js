import { Col, Divider, Row } from "antd"

import SvgIcon from "src/components/SvgIcon"
import useWindowSize from "src/lib/useWindowSize"
import { NewsItemStyled } from "../styled"
export const NewItemImage = ({
  item,
  onClick = () => {},
  showDivider = true,
}) => {
  const isMobile = !!useWindowSize.isMobile()
  return (
    <NewsItemStyled onClick={onClick}>
      <Row gutter={24} style={{ flexWrap: "nowrap" }}>
        <Col span={10} className="news-image">
          <img
            src={item?.image}
            width="100%"
            loading="lazy"
            className="image"
            style={{
              height: isMobile ? 115 : 230,
              objectFit: item?.image ? "cover" : "contain",
            }}
            alt="news"
          />
        </Col>
        <Col span={14}>
          <div
            className={`main-header ${
              isMobile ? "fs-16 max-line2" : "max-line2"
            }`}
          >
            {item?.title}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "6px 0px 20px",
            }}
          >
            <div className="time mr-5"> {item?.time}</div>
            {!(item?.TopicID === 13) && (
              <>
                <div className="d-flex">
                  <SvgIcon
                    name="mode-comment"
                    style={{ margin: "0 6px 0 0px" }}
                  />
                  <div className="number-comment">{item?.luot_xem}</div>
                </div>
                <div className="d-flex">
                  <SvgIcon name="view" style={{ margin: "0 6px 0 10px" }} />
                  <div className="number-comment">
                    {/* {!!item?.NumberOfViewers ? item?.NumberOfViewers : 0} */}
                    {item?.luot_xem}
                  </div>
                </div>
              </>
            )}
          </div>
          {!!item?.content && (
            <div
              className={`"content" ${isMobile ? "max-line1" : "max-line3"}`}
            >
              {item?.content}
            </div>
          )}
        </Col>
      </Row>
      {!!showDivider && <Divider />}
    </NewsItemStyled>
  )
}
