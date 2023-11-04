import { Col, Divider, Row } from "antd"
import React from "react"
import { NewsItemStyled } from "src/components/News/styled"
import DefaultPostImg from "src/assets/images/logo/logoLeft.png"
import useWindowSize from "src/lib/useWindowSize"
import SvgIcon from "src/components/SvgIcon"
import { fomatTimeFromNow } from "src/lib/time"
import { useNavigate } from "react-router-dom"
import NewsBadge from "../../Home/component/AllNew/component/NewsBadge"

const NewFourItem = ({ data, onClick }) => {
  const isMobile = !!useWindowSize.isMobile()
  const navigate = useNavigate()
  return (
    <NewsItemStyled onClick={onClick}>
      <Row gutter={[16, 0]} className={"bd-post-one1"}>
        {data?.map((item, idx) => (
          <>
            {idx === 0 ? (
              <Col span={24}>
                <NewsBadge
                  time={item?.PublishDate}
                  placement={"end"}
                  key={item?.PostID}
                >
                  <Row
                    className="bd-post-one"
                    gutter={12}
                    style={{ flexWrap: "nowrap", width: "100%" }}
                    onClick={() => {
                      window.scrollTo({ top: 0, left: 0 })
                      navigate(`/noi-dung/${item?.PostID}`)
                    }}
                  >
                    <Col span={isMobile ? 10 : 8}>
                      <div
                        className={`main-header ${
                          isMobile ? "fs-16 max-line2" : "max-line4"
                        }`}
                      >
                        {item?.Title}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          margin: "6px 0px 20px",
                        }}
                      >
                        {/* <div className="time mr-5">
                          {" "}
                          {item?.PublishDate &&
                            fomatTimeFromNow(item?.PublishDate)}
                        </div> */}
                        {!(item?.TopicID === 13) && (
                          <>
                            <div className="d-flex">
                              <SvgIcon
                                name="mode-comment"
                                style={{ margin: "0 6px 0 0px" }}
                              />
                              <div className="number-comment">
                                {item?.NumberComment}
                              </div>
                            </div>
                            <div className="d-flex">
                              <SvgIcon
                                name="view"
                                style={{ margin: "0 6px 0 10px" }}
                              />
                              <div className="number-comment">
                                {/* {!!item?.NumberOfViewers ? item?.NumberOfViewers : 0} */}
                                {item?.NumberOfViewers}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      {!!item?.Summary && (
                        <div
                          className={`"content" ${
                            isMobile ? "max-line2" : "max-post"
                          }`}
                        >
                          {item?.Summary}
                        </div>
                      )}
                    </Col>
                    <Col span={isMobile ? 14 : 16} className="news-image">
                      <img
                        src={item?.Image || DefaultPostImg}
                        width="100%"
                        loading="lazy"
                        className="image"
                        style={{
                          height: isMobile ? 115 : 330,
                          objectFit: item?.Image ? "cover" : "contain",
                        }}
                        alt="news"
                      />
                    </Col>
                  </Row>
                </NewsBadge>
              </Col>
            ) : (
              <Col
                span={8}
                key={item?.PostID}
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0 })
                  navigate(`/noi-dung/${item?.PostID}`)
                }}
                className={`${idx < data?.length - 1 && "bd-post-right"} ${
                  isMobile ? "pb-0" : ""
                } pt-24`}
              >
                <NewsBadge time={item?.PublishDate} placement={"end"}>
                  <div className={`news-image `}>
                    <img
                      src={item?.Image || DefaultPostImg}
                      width="100%"
                      loading="lazy"
                      className="image"
                      style={{
                        height: isMobile ? 70 : 160,
                        objectFit: item?.Image ? "cover" : "contain",
                      }}
                      alt="news"
                    />
                  </div>
                  <div>
                    <div
                      className={`main-header mt-5 ${
                        isMobile ? " fs-13 max-line2" : " fs-16 max-line2"
                      }`}
                    >
                      {item?.Title}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "6px 0px 20px",
                      }}
                    >
                      {/* <div className="time mr-5">
                        {" "}
                        {item?.PublishDate &&
                          fomatTimeFromNow(item?.PublishDate)}
                      </div> */}
                      {!(item?.TopicID === 13) && (
                        <>
                          <div className="d-flex">
                            <SvgIcon
                              name="mode-comment"
                              style={{ margin: "0 6px 0 0px" }}
                            />
                            <div className="number-comment">
                              {item?.NumberComment}
                            </div>
                          </div>
                          <div className="d-flex">
                            <SvgIcon
                              name="view"
                              style={{ margin: "0 6px 0 10px" }}
                            />
                            <div className="number-comment">
                              {/* {!!item?.NumberOfViewers ? item?.NumberOfViewers : 0} */}
                              {item?.NumberOfViewers}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </NewsBadge>
              </Col>
            )}
          </>
        ))}
      </Row>
    </NewsItemStyled>
  )
}

export default NewFourItem
