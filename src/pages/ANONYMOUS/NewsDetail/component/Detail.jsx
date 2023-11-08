import {
  LocalizationContext,
  ThemeContext,
  Viewer,
  Worker,
} from "@react-pdf-viewer/core"
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
import { toolbarPlugin } from "@react-pdf-viewer/toolbar"
import { Col, Divider, message, Row, Spin } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { FacebookShareButton } from "react-share"
import CB1 from "src/components/Modal/CB1"
// import { linkYoutube } from "src/components/News/linkYoutube"
import Notice from "src/components/Notice"
import SvgIcon from "src/components/SvgIcon"
import STORAGE, { getStorage } from "src/lib/storage"
import useWindowSize from "src/lib/useWindowSize"
// import CommentServices from "src/services/CommentServices"
import PostService from "src/services/PostService"
import { NewsDetailStyled, ViewPDFStyle } from "../styled"
import vi_VN from "../vi_VN.json"
// import Comments from "./Comments"

const Detail = () => {
  const PostInfo = useLocation()?.state
  const isMobile = !!useWindowSize.isMobile()
  const [loading, setLoading] = useState(false)
  const [loadingComment, setLoadingComment] = useState(false)
  const [detailNews, setDetailNews] = useState()
  const [listPostRelate, setListPostRelate] = useState()
  const isLogin = getStorage(STORAGE.TOKEN)
  const [listComment, setListComment] = useState([])
  const [expandComment, setExpandComment] = useState([])
  const [replyComment, setReplyComment] = useState("")
  const [newComment, setNewComment] = useState("")
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [valueToCorrect, setValueToCorrect] = useState("")
  const [CommentIDToCorrect, setCommentIDToCorrect] = useState(undefined)

  const toolbarPluginInstance = toolbarPlugin()
  const { Toolbar } = toolbarPluginInstance
  const [currentTheme, setCurrentTheme] = useState("light")
  const [l10n, setL10n] = useState(vi_VN)
  const localizationContext = { l10n, setL10n }
  const themeContext = { currentTheme, setCurrentTheme }
  const items = [
    {
      label: `Quan tâm nhất`,
      key: 1,
      children: null,
    },
    {
      label: `Mới nhất`,
      key: 2,
      children: null,
    },
  ]

  const [tabActive, setTabActive] = useState(1)
  const navigate = useNavigate()
  const articleUrl = window.location.href
  const getDetailPost = async () => {
    try {
      setLoading(true)
      const res = await PostService.getDetailPostHome({
        id_bai_viet: PostInfo?.id,
        luot_xem: PostInfo?.luot_xem,
      })
      if (res?.isError) return
      setDetailNews(res?.Object)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (PostInfo) getDetailPost()
  }, [PostInfo])

  const getComment = async () => {
    setLoadingComment(true)
    try {
      // let loadCmt = () => {}
      // //Post
      // if (!!PostID) {
      //   if (!!isLogin) loadCmt = await CommentServices.getAllPostCommnetByType
      //   else loadCmt = await GuestServices.getComment
      // }
      // loadCmt({
      //   Type: tabActive,
      //   PostID: PostID,
      // }).then(res => {
      //   if (res.isError) return
      //   setListComment(res?.Object)
      //   res?.Object?.data?.length &&
      //     res?.Object?.data?.map(i => {
      //       setExpandComment(pre => [
      //         ...pre,
      //         {
      //           PostCommentID: i?.PostCommentID,
      //           expand: !!(i?.Content?.length > 390),
      //           expandContent: i?.Content?.length < 390,
      //         },
      //       ])
      //       i?.lstReplyComments?.length &&
      //         i?.lstReplyComments?.map(item => {
      //           setExpandComment(pre => [
      //             ...pre,
      //             {
      //               PostCommentID: item?.PostCommentID,
      //               expand: !!(item?.Content?.length > 390),
      //               expandContent: item?.Content?.length < 390,
      //             },
      //           ])
      //         })
      //     })
      // })
    } finally {
      setLoadingComment(false)
    }
  }
  const handleDeleteComment = item => {
    CB1({
      title: `Bạn có chắc chắn muốn xóa bình luận này không?`,
      icon: "warning-usb",
      okText: "Đồng ý",
      onOk: () => {
        setLoadingComment(true)
        // CommentServices.deleteComment({
        //   PostCommentID: item.PostCommentID,
        //   PostID: PostID,
        // })
        //   .then(res => {
        //     if (res.isOk) {
        //       Notice({
        //         msg: "Xóa thành công",
        //         isSuccess: true,
        //       })
        //       getComment()
        //     }
        //   })
        //   .finally(() => {
        //     setLoadingComment(false)
        //   })
      },
    })
  }

  const insertComment = (value, commentID = undefined) => {
    if (!!isLogin) {
      if (value === "") {
        message.error("Vui lòng nhập nội dung")
        return
      } else {
        setLoadingComment(true)
        // CommentServices.insertComment({
        //   PostID: PostID,
        //   Content: value,
        //   ParentID: commentID,
        // })
        //   .then(res => {
        //     if (res.isOk) {
        //       getComment()
        //       if (commentID) setReplyComment("")
        //       else setNewComment("")
        //     }
        //   })
        //   .finally(() => setLoadingComment(false))
      }
    } else {
      message.warn("Vui lòng đăng nhập")
      setOpenLoginModal(true)
    }
  }

  const updateComment = value => {
    if (value === "") {
      message.error("Vui lòng nhập nội dung")
      return
    } else {
      setLoadingComment(true)
      // CommentServices.updateComment({
      //   Content: value,
      //   PostCommentID: CommentIDToCorrect,
      // })
      //   .then(res => {
      //     if (res.isOk) {
      //       setValueToCorrect("")
      //       setCommentIDToCorrect(undefined)
      //       getComment()
      //     }
      //   })
      //   .finally(() => setLoadingComment(false))
    }
  }

  const handleLikeComment = (liked, commentID) => {
    setLoadingComment(true)
    // CommentServices.likeComment({
    //   Type: liked ? 2 : 1,
    //   PostCommentID: commentID,
    // })
    //   .then(res => {
    //     if (res.isOk) {
    //       getComment()
    //     }
    //   })
    //   .finally(() => setLoadingComment(false))
  }

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
                <SvgIcon name="access-time" className="mr-5" />
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
                <div className="number-comment">{detailNews?.luot_xem}</div>
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
          <Row gutter={16} style={{ marginBottom: "10px" }}>
            {detailNews?.ListTags?.map((i, idx) => (
              <Col key={`tag${idx}`}>
                <div className="news-detail-box-tags">{i.TagsName}</div>
              </Col>
            ))}
          </Row>
          <div
            className="button-back"
            onClick={() => {
              window.scrollTo(0, 0)
              window.history.back()
            }}
          >
            <SvgIcon name="arrow-back-red" style={{ marginRight: "5px" }} />
            Trở về
          </div>
          {/* {!!detailNews?.IsComment && (
            <Comments
              loading={loadingComment}
              items={items}
              tabActive={tabActive}
              setTabActive={setTabActive}
              CommentIDToCorrect={CommentIDToCorrect}
              setCommentIDToCorrect={setCommentIDToCorrect}
              listComment={listComment}
              newComment={newComment}
              setNewComment={setNewComment}
              valueToCorrect={valueToCorrect}
              setValueToCorrect={setValueToCorrect}
              expandComment={expandComment}
              setExpandComment={setExpandComment}
              replyComment={replyComment}
              setReplyComment={setReplyComment}
              openLoginModal={openLoginModal}
              setOpenLoginModal={setOpenLoginModal}
              getComment={getComment}
              handleDeleteComment={handleDeleteComment}
              insertComment={insertComment}
              updateComment={updateComment}
              handleLikeComment={handleLikeComment}
            />
          )} */}

          <div className="title-type-1">Bài viết liên quan</div>
          {listPostRelate?.length > 0 &&
            listPostRelate?.map(item => (
              <div
                style={{ cursor: "pointer" }}
                key={`news-relate-to${item?.PostID}`}
                className="primary-color text-ellipsis mb-12 fw-600"
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0 })
                  navigate(`/noi-dung/${item?.PostID}`)
                }}
              >
                {item?.Title}
              </div>
            ))}
        </NewsDetailStyled>
      )}
    </Spin>
  )
}

export default Detail
