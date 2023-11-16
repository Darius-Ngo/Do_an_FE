import {
  LocalizationContext,
  ThemeContext,
  Viewer,
  Worker,
} from "@react-pdf-viewer/core"
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
import { toolbarPlugin } from "@react-pdf-viewer/toolbar"
import { Col, Divider, Row, Space, Spin, Tag } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { FacebookShareButton } from "react-share"
import SvgIcon from "src/components/SvgIcon"
import useWindowSize from "src/lib/useWindowSize"
import { useDispatch, useSelector } from "react-redux"
import { setTagID } from "src/redux/post"
import ROUTER from "src/router"
import PostService from "src/services/PostService"
import { NewsDetailStyled, ViewPDFStyle } from "../styled"
import vi_VN from "../vi_VN.json"
import Comments from "./Comments"

const Detail = () => {
  const { userInfo } = useSelector(state => state.appGlobal)
  const dispatch = useDispatch()
  const PostInfo = useLocation()?.state
  const isMobile = !!useWindowSize.isMobile()
  const [loading, setLoading] = useState(false)
  const [detailNews, setDetailNews] = useState()
  const [listPostRelate, setListPostRelate] = useState()

  const toolbarPluginInstance = toolbarPlugin()
  const { Toolbar } = toolbarPluginInstance
  const [currentTheme, setCurrentTheme] = useState("light")
  const [l10n, setL10n] = useState(vi_VN)
  const localizationContext = { l10n, setL10n }
  const themeContext = { currentTheme, setCurrentTheme }

  const navigate = useNavigate()
  const articleUrl = window.location.href
  const getListPostHome = async id_the => {
    try {
      setLoading(true)
      const res = await PostService.getListPostHome({
        id_the: id_the,
      })
      if (res?.isError) return
      setListPostRelate(res?.Object?.data)
    } finally {
      setLoading(false)
    }
  }
  const getDetailPost = async () => {
    try {
      setLoading(true)
      const res = await PostService.getDetailPostHome({
        id_bai_viet: PostInfo?.id,
        luot_xem: PostInfo?.luot_xem,
      })
      if (res?.isError) return
      setDetailNews(res?.Object)
      getListPostHome(res?.Object?.the_bv[0]?.id_the)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (PostInfo) getDetailPost()
  }, [PostInfo])

  return (
    <Spin spinning={loading}>
      {!detailNews ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          Không tồn tại bài đăng
        </div>
      ) : (
        <NewsDetailStyled
          style={{
            background: "#fff",
            borderRadius: "8px",
            padding: "16px 24px",
          }}
        >
          <div className={`new-detail-header ${isMobile ? "fs-16" : ""}`}>
            {detailNews?.tieu_de}
          </div>
          <Row
            gutter={10}
            className="align-items-center new-detail-sub-header mb-16"
          >
            {!!detailNews?.ngay_dang && (
              <Col className="new-detail-sub-text d-flex-start">
                <SvgIcon name="calendar" className="mr-5" />
                {moment(detailNews?.ngay_dang).format("DD/MM/YYYY ")}
              </Col>
            )}
            <Col>
              <div className="d-flex">
                <SvgIcon name="view" style={{ margin: "0 6px 0 0px" }} />
                <div className="number-comment">{detailNews?.luot_xem}</div>
              </div>
            </Col>
            <Col>
              <div className="d-flex">
                <SvgIcon
                  name="mode-comment"
                  style={{ margin: "0 6px 0 0px" }}
                />
                <div className="number-comment">{detailNews?.luot_bl}</div>
              </div>
            </Col>
            <FacebookShareButton url={articleUrl}>
              <div className="d-flex-start share-face">
                <SvgIcon name="login-facebook" className="mr-5" />
                <span>Chia sẻ </span>
              </div>
            </FacebookShareButton>
          </Row>
          {/* <div
            className={`new-detail-content mb-24 ${
              isMobile && "ml-0 mt-8 mb-12"
            }`}
            style={{ lineHeight: "1.5" }}
          >
            {detailNews?.tom_tat}
          </div> */}

          {/* {!!detailNews?.YoutubeLink && (
            <iframe
              width="100%"
              height="500"
              src={linkYoutube(detailNews?.YoutubeLink)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )} */}
          {!!detailNews?.ListFile?.length && (
            <div className="mb-16">
              <div className="mb-16 fw-600 fs-16">Tài liệu đính kèm</div>
              {detailNews?.ListFile?.map(i => (
                <a rel="noreferrer" target="_blank" href={i?.FileUrl}>
                  <Row gutter={10}>
                    <Col>
                      <SvgIcon name="link" />
                    </Col>
                    <Col>{i?.FileName}</Col>
                  </Row>
                </a>
              ))}
            </div>
          )}

          <div
            dangerouslySetInnerHTML={{ __html: detailNews?.noi_dung }}
            style={{ overflowX: "hidden" }}
          />
          {!!detailNews?.ListFile?.length &&
            detailNews?.ListFile?.map((item, id) =>
              item?.FileUrl ? (
                <ViewPDFStyle>
                  <div className="pdf-container ">
                    <ThemeContext.Provider value={themeContext}>
                      <LocalizationContext.Provider value={localizationContext}>
                        <div
                          className={`rpv-core__viewer rpv-core__viewer--${currentTheme}`}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              flex: 1,
                              overflow: "hidden",
                            }}
                          >
                            <Worker
                              workerUrl="https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js"
                              className="custom"
                            >
                              <Viewer
                                fileUrl={item?.FileUrl ? item?.FileUrl : ""}
                                plugins={[toolbarPluginInstance]}
                              />
                            </Worker>
                          </div>
                        </div>
                      </LocalizationContext.Provider>
                    </ThemeContext.Provider>
                  </div>
                </ViewPDFStyle>
              ) : (
                ""
              ),
            )}
          <Divider />
          <Space size={8}>
            <div className="mr-12 fw-600">TAGS:</div>
            {detailNews?.the_bv?.map((i, idx) => (
              <Tag
                key={i?.id_the}
                className="fw-600 p-5 pl-16 pr-16 pointer"
                onClick={() => {
                  navigate(ROUTER.TIN_TUC)
                  dispatch(setTagID(i.id_the))
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }}
              >
                {i?.ten_the}
              </Tag>
            ))}
          </Space>
          <Divider />
          <div
            className="button-back"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
              window.history.back()
            }}
          >
            <SvgIcon name="arrow-back-red" style={{ marginRight: "5px" }} />
            Trở về
          </div>
          {detailNews?.binh_luan_bv && (
            <Comments userInfo={userInfo} PostInfo={PostInfo} />
          )}

          {/* <div className="title-type-1">Bài viết khác</div>
          {listPostRelate?.length > 0 &&
            listPostRelate?.map(
              item =>
                item?.id !== PostInfo?.id && (
                  <div
                    style={{ cursor: "pointer" }}
                    key={`news-relate-to${item?.id}`}
                    className="primary-color text-ellipsis mb-12 fw-600"
                    onClick={() => {
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                      navigate(`/noi-dung/${item?.PostID}`)
                    }}
                  >
                    {item?.tieu_de}
                  </div>
                ),
            )} */}
        </NewsDetailStyled>
      )}
    </Spin>
  )
}

export default Detail
