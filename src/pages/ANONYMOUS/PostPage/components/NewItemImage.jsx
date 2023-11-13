import { Col, Divider, Row, Tag } from "antd"

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
          <div className="w-100 h-100" style={{ overflow: "hidden" }}>
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
          </div>
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
            <SvgIcon name="calendar" className="mr-5" />
            <div className="time mr-8"> {item?.time}</div>
            {!(item?.TopicID === 13) && (
              <>
                <div className="d-flex mr-12">
                  <SvgIcon
                    name="mode-comment"
                    style={{ margin: "0 6px 0 0px" }}
                  />
                  <div className="number-comment ">{item?.luot_bl}</div>
                </div>
                <div className="d-flex">
                  <SvgIcon name="view" style={{ margin: "0 6px 0 0" }} />
                  <div className="number-comment">{item?.luot_xem}</div>
                </div>
              </>
            )}
          </div>
          {!!item?.content && (
            <div
              className={`"content" ${isMobile ? "max-line1" : "max-line5"}`}
            >
              {item?.content}
            </div>
          )}
          <div className="mt-16 fw-600">
            Tags:{" "}
            {item?.the_bv?.map(i => (
              <Tag key={i?.id_the}>{i?.ten_the}</Tag>
            ))}
          </div>
        </Col>
      </Row>
      {!!showDivider && <Divider />}
    </NewsItemStyled>
  )
}
