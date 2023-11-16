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
import dayjs from "dayjs"

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
  const [listComment, setListComment] = useState([])
  const [totalComment, setTotalComment] = useState(0)
  const [tabActive, setTabActive] = useState(1)
  const [newComment, setNewComment] = useState()
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
      setListComment(res?.Object?.data)
      setTotalComment(res?.Object?.total)
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
      icon: "trashRed",
      okText: "Đồng ý",
      onOk: () => {
        setLoadingComment(true)
        CommentService.deleteComment({
          id_bl: item.id,
        })
          .then(res => {
            if (res.isError) return
            getComment()
          })
          .finally(() => {
            setLoadingComment(false)
          })
      },
    })
  }

  const insertComment = async (value, parentID) => {
    if (!!isLogin) {
      if (value === "") {
        message.error("Vui lòng nhập nội dung")
        return
      } else {
        setLoadingComment(true)
        try {
          const res = await CommentService.addComment({
            id_bai_viet: PostInfo?.id,
            id_nguoi_dung: userInfo?.id,
            noi_dung: value,
            id_bl_cha: parentID,
          })
          if (res.isError) return
          getComment()
          setNewComment("")
        } finally {
          setLoadingComment(false)
        }
      }
    } else {
      message.warning("Vui lòng đăng nhập")
      dispatch(setOpenLoginModal(true))
    }
  }

  const updateComment = async (value, item) => {
    if (value === "") {
      message.error("Vui lòng nhập nội dung")
      return
    } else {
      setLoadingComment(true)
      try {
        const res = await CommentService.updateComment({
          id: item.id,
          noi_dung: value,
        })
        if (res.isError) return
        // changeValueTable({
        //   ...item,
        //   isEdit: false,
        // })
        getComment()
      } finally {
        setLoadingComment(false)
      }
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

  const changeValueTable = object => {
    console.log("object", object)
    setListComment(pre =>
      pre?.map((i, index) => {
        if (+i.id !== +object.id) return i
        return { ...i, ...object }
      }),
    )
  }

  return (
    <CommentWrapper>
      <Spin spinning={loadingComment}>
        <div className="comment-header">Bình luận ({totalComment})</div>
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
        {listComment?.map((i, idx) => {
          return (
            <>
              <Row
                gutter={16}
                key={i?.PostCommentID}
                className="mb-16 pb-8"
                style={{ borderBottom: "1px dashed #f0f0f0" }}
              >
                <Col flex="40px">
                  <Avatar src={i?.avatar} alt="" loading="lazy" width={40} />
                </Col>
                <Col flex="auto">
                  <div className="d-flex align-items-center">
                    <div className="fw-600 mr-12">{i?.ho_ten}</div>
                    <div className="time-comment">
                      {dayjs(i?.thoi_gian_bl)?.format("HH:MM DD/MM/YYYY")}
                    </div>
                  </div>
                  {i?.isEdit ? (
                    <Input
                      defaultValue={i?.noi_dung}
                      className="mt-4"
                      placeholder="Sửa bình luận"
                      onPressEnter={e => {
                        updateComment(e.target.value, i)
                      }}
                    />
                  ) : (
                    <div className="mt-12">{i?.noi_dung}</div>
                  )}
                  {/* <div className="social-option">
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
                  </div> */}
                </Col>
                {!!isLogin && i?.isOwner && (
                  <Col flex="40px" className="popup-comment">
                    <Popover
                      content={
                        <PopoverWrapper>
                          <div
                            className="popover-option"
                            onClick={e => {
                              e.stopPropagation()
                              changeValueTable({
                                ...i,
                                isEdit: true,
                              })
                            }}
                          >
                            Chỉnh sửa
                          </div>
                          <div
                            className="popover-option"
                            style={{ color: "var(--color-red-500)" }}
                            onClick={() => handleDeleteComment(i)}
                          >
                            Xóa
                          </div>
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
        })}
      </Spin>
    </CommentWrapper>
  )
}

export default Comments
