import { Avatar, Col, Input, Popover, Row, Spin, Tabs, message } from "antd"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import CB1 from "src/components/Modal/CB1"
import SvgIcon from "src/components/SvgIcon"
import STORAGE, { getStorage } from "src/lib/storage"
import { setOpenLoginModal } from "src/redux/loginModal"
import CommentService from "src/services/CommentService"
import ReplyComment from "./ReplyComment"
import "./comments.scss"
import { CommentWrapper, PopoverWrapper, TabsNewsStyled } from "./styled"

const Comments = ({
  // items,
  // tabActive,
  // setTabActive,
  // CommentIDToCorrect,
  // setCommentIDToCorrect,
  // listComment,
  // newComment,
  // setNewComment,
  // valueToCorrect,
  // setValueToCorrect,
  // expandComment,
  // setExpandComment,
  // replyComment,
  // setReplyComment,
  // openLoginModal,
  // setOpenLoginModal,
  PostInfo,
  userInfo,
}) => {
  const dispatch = useDispatch()
  const isLogin = getStorage(STORAGE.TOKEN)
  const textInput = useRef()
  const editCommentRef = useRef()
  const [loadingComment, setLoadingComment] = useState(false)
  const [listComment, setListComment] = useState(false)
  const [tabActive, setTabActive] = useState(1)
  const [newComment, setNewComment] = useState(1)
  const [commentID, setCommentID] = useState(undefined)

  const focusTextInput = () =>
    textInput.current.focus({
      cursor: "end",
    })
  const focusEditComment = () =>
    editCommentRef.current.focus({
      cursor: "end",
    })

  useEffect(() => {
    commentID && focusTextInput()
  }, [commentID])

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

  // useEffect(() => {
  //   CommentIDToCorrect && focusEditComment()
  // }, [CommentIDToCorrect])

  const getComment = async () => {
    setLoadingComment(true)
    try {
      const res = await CommentService.getListComment({
        id_bai_viet: PostInfo?.id,
        id_nguoi_dung: userInfo?.id,
      })
      if (res.isError) return
      setListComment(res?.Object)
      // res?.Object?.data?.length &&
      //   res?.Object?.data?.map(i => {
      //     setExpandComment(pre => [
      //       ...pre,
      //       {
      //         PostCommentID: i?.PostCommentID,
      //         expand: !!(i?.Content?.length > 390),
      //         expandContent: i?.Content?.length < 390,
      //       },
      //     ])
      //     i?.lstReplyComments?.length &&
      //       i?.lstReplyComments?.map(item => {
      //         setExpandComment(pre => [
      //           ...pre,
      //           {
      //             PostCommentID: item?.PostCommentID,
      //             expand: !!(item?.Content?.length > 390),
      //             expandContent: item?.Content?.length < 390,
      //           },
      //         ])
      //       })
      //   })
    } finally {
      setLoadingComment(false)
    }
  }
  useEffect(() => {
    if (PostInfo) getComment()
  }, [PostInfo, userInfo])
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
      dispatch(setOpenLoginModal(true))
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
    <CommentWrapper>
      <Spin spinning={loadingComment}>
        <div className="comment-header">Bình luận ({listComment?.total})</div>

        <div className="my-comment">
          <Avatar
            src={userInfo?.avatar}
            alt=""
            loading="lazy"
            width={40}
            icon={<SvgIcon name="user-header" />}
          />
          <Input
            value={newComment}
            placeholder="Để lại bình luận"
            onChange={e => setNewComment(e.target.value)}
            onPressEnter={e => {
              insertComment(e.target.value)
            }}
          />
        </div>
        {!!items && (
          <TabsNewsStyled>
            <Tabs
              items={items}
              activeKey={tabActive}
              onChange={tab => setTabActive(tab)}
            />
          </TabsNewsStyled>
        )}
        {/* {listComment?.data?.map(i => {
          return (
            <>
              <Row gutter={16} key={i?.PostCommentID}>
                <Col flex="40px">
                  <Avatar src={i?.avatar} alt="" loading="lazy" width={40} />
                </Col>
                <Col flex="auto">
                  <div>
                    {CommentIDToCorrect === i?.PostCommentID ? (
                      <Input
                        ref={editCommentRef}
                        value={valueToCorrect}
                        onChange={e => setValueToCorrect(e.target.value)}
                        onPressEnter={e => updateComment(e.target.value)}
                        onBlur={() => setCommentIDToCorrect(undefined)}
                      />
                    ) : (
                      <div
                        className={`content-comment `}
                        style={{ textAlign: "justify" }}
                      >
                        <span
                          className={
                            !!expandComment?.find(
                              item => item?.PostCommentID === i?.PostCommentID,
                            )?.expandContent
                              ? ""
                              : "max-line4 expand-div-comment"
                          }
                        >
                          <b>{i?.FullName}: </b> {i?.Content}
                        </span>
                        {!!expandComment?.find(
                          item => item?.PostCommentID === i?.PostCommentID,
                        )?.expand && (
                          <span>
                            {!expandComment?.find(
                              item => item?.PostCommentID === i?.PostCommentID,
                            )?.expandContent ? (
                              <span
                                style={{ color: "#008dd6" }}
                                className="pointer expand-hover"
                                onClick={() => {
                                  setExpandComment(prev => [
                                    ...prev?.filter(
                                      item =>
                                        item?.PostCommentID !==
                                        i?.PostCommentID,
                                    ),
                                    {
                                      PostCommentID: i?.PostCommentID,
                                      expandContent: true,
                                      expand: true,
                                    },
                                  ])
                                }}
                              >{`Xem thêm >>`}</span>
                            ) : (
                              <span
                                style={{ color: "#008dd6" }}
                                className="pointer expand-hover"
                                onClick={() => {
                                  setExpandComment(prev => [
                                    ...prev?.filter(
                                      item =>
                                        item?.PostCommentID !==
                                        i?.PostCommentID,
                                    ),
                                    {
                                      PostCommentID: i?.PostCommentID,
                                      expandContent: false,
                                      expand: true,
                                    },
                                  ])
                                }}
                              >{` << Thu gọn`}</span>
                            )}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="social-option">
                    <div className="d-flex">
                      <SvgIcon
                        name={`${i?.IsLike ? "liked" : "react-like-fb"}`}
                        onClick={() =>
                          !!isLogin &&
                          handleLikeComment(i?.IsLike, i?.PostCommentID)
                        }
                        style={{ marginRight: "5px", cursor: "pointer" }}
                      />
                      <div className="border-bottom-1">{i?.NumberLike}</div>
                    </div>
                    <div
                      className="mb-24 border-bottom-1"
                      onClick={e => {
                        e.stopPropagation()
                        setCommentID(i?.PostCommentID)
                        focusTextInput()
                      }}
                    >
                      Trả lời
                    </div>
                    <div
                      className="border-bottom-1"
                      style={{ marginLeft: "24px" }}
                    >
                      {i?.TimeExistence}
                    </div>
                  </div>
                  <div
                    className={`${
                      commentID === i?.PostCommentID && "see-more"
                    }`}
                  >
                    {commentID === i?.PostCommentID
                      ? i?.lstReplyComments?.map(item => {
                          return (
                            <ReplyComment
                              item={item}
                              likeComment={handleLikeComment}
                              expandComment={expandComment}
                              setExpandComment={setExpandComment}
                              replyComment={item => {
                                setReplyComment(`@${item.FullName} `)
                                focusTextInput()
                              }}
                            />
                          )
                        })
                      : i?.lstReplyComments?.length > 0 && (
                          <div
                            className="d-flex border-bottom-1"
                            onClick={e => {
                              e.stopPropagation()
                              setCommentID(i?.PostCommentID)
                            }}
                          >
                            <SvgIcon
                              name="arrow-bend-down"
                              style={{ marginRight: "5px" }}
                            />
                            {i?.lstReplyComments?.length} trả lời
                          </div>
                        )}
                    {commentID === i?.PostCommentID ? (
                      <div className="reply-comment">
                        <Avatar
                          src={userInfo?.avatar}
                          alt=""
                          loading="lazy"
                          width={40}
                        />
                        <Input
                          ref={textInput}
                          value={replyComment}
                          placeholder="Nhập"
                          onChange={e => setReplyComment(e.target.value)}
                          onPressEnter={e => {
                            insertComment(e.target.value, i?.PostCommentID)
                          }}
                        />
                      </div>
                    ) : null}
                  </div>
                </Col>
                {!!isLogin && (i?.IsDelete || i?.IsUpdate) && (
                  <Col flex="40px" className="popup-comment">
                    <Popover
                      content={
                        <PopoverWrapper>
                          {i?.IsDelete && (
                            <div
                              className="popover-option"
                              onClick={() => handleDeleteComment(i)}
                            >
                              Xóa
                            </div>
                          )}
                          {i?.IsUpdate && (
                            <div
                              className="popover-option"
                              onClick={e => {
                                e.stopPropagation()
                                // setCommentIDToCorrect(i?.PostCommentID)
                                // setValueToCorrect(i?.Content)
                              }}
                            >
                              Chỉnh sửa
                            </div>
                          )}
                        </PopoverWrapper>
                      }
                      title={null}
                      placement="bottomRight"
                      trigger="hover"
                      zIndex={1}
                    >
                      <div className="comment-edit">
                        <SvgIcon
                          name="more-horiz"
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </Popover>
                  </Col>
                )}
              </Row>
            </>
          )
        })} */}
      </Spin>
    </CommentWrapper>
  )
}

export default Comments
