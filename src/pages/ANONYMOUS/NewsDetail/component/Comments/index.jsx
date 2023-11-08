import { Avatar, Col, Input, Popover, Row, Spin, Tabs } from "antd"
import { useEffect, useRef, useState } from "react"
import RePasswordModal from "src/components/Layouts/component/Forget/components/RePasswordModal"
import VerifyForgetModal from "src/components/Layouts/component/Forget/components/VerifyForgotModal"
import ForgetModal from "src/components/Layouts/component/Forget/ForgetModal"
import LoginModal from "src/components/Layouts/component/Login/LoginModal"
import RegisterEnterpriseModal from "src/components/Layouts/component/Register/components/RegisterEnterpriseModal"
import RegisterModal from "src/components/Layouts/component/Register/components/RegisterModal"
import SelectRegisterModal from "src/components/Layouts/component/Register/SelectRegisterModal"
import SvgIcon from "src/components/SvgIcon"
import STORAGE, { getStorage } from "src/lib/storage"
import ReplyComment from "./ReplyComment"
import { CommentWrapper, PopoverWrapper, TabsNewsStyled } from "./styled"
import "./comments.scss"

const Comments = ({
  loading,
  items,
  tabActive,
  setTabActive,
  CommentIDToCorrect,
  setCommentIDToCorrect,
  listComment,
  newComment,
  setNewComment,
  valueToCorrect,
  setValueToCorrect,
  expandComment,
  setExpandComment,
  replyComment,
  setReplyComment,
  openLoginModal,
  setOpenLoginModal,
  getComment,
  handleDeleteComment,
  insertComment,
  updateComment,
  handleLikeComment,
}) => {
  const [commentID, setCommentID] = useState(undefined)
  const [openSelectRegisterModal, setOpenSelectRegisterModal] = useState(false)
  const [openForgetPassModal, setOpenForgetPassModal] = useState(false)
  const [accountType, setAccountType] = useState()
  const [email, setEmail] = useState(false)
  const [codeVerify, setCodeVerify] = useState()
  const [rePasswordModal, setRePasswordModal] = useState(false)
  const [openRegisterModal, setOpenRegisterModal] = useState(false)
  const [openRegisterEnterpriseModal, setOpenRegisterEnterpriseModal] =
    useState(false)
  const [openVerifyModal, setOpenVerifyModal] = useState(false)
  const user = getStorage(STORAGE.USER_INFO)
  const isLogin = getStorage(STORAGE.TOKEN)
  const textInput = useRef()
  const editCommentRef = useRef()

  const focusTextInput = () =>
    textInput.current.focus({
      cursor: "end",
    })
  const focusEditComment = () =>
    editCommentRef.current.focus({
      cursor: "end",
    })

  useEffect(() => {
    getComment()
  }, [tabActive])

  useEffect(() => {
    commentID && focusTextInput()
  }, [commentID])

  useEffect(() => {
    CommentIDToCorrect && focusEditComment()
  }, [CommentIDToCorrect])

  return (
    <CommentWrapper>
      <Spin spinning={loading}>
        <div className="comment-header">Bình luận ({listComment?.total})</div>

        <div className="my-comment">
          <Avatar src={user?.Avatar} alt="" loading="lazy" width={40} />
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
        {listComment?.data?.map(i => {
          return (
            <>
              <Row gutter={16} key={i?.PostCommentID}>
                <Col flex="40px">
                  <Avatar src={i?.Avatar} alt="" loading="lazy" width={40} />
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
                        setReplyComment("")
                        focusTextInput()
                      }}
                    >
                      Trả lời
                    </div>

                    {/* {!!isLogin && (
                      <div className="border-bottom-1">Chia sẻ</div>
                    )} */}
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
                          src={user?.Avatar}
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
                                setCommentIDToCorrect(i?.PostCommentID)
                                setValueToCorrect(i?.Content)
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
        })}
        {!!openLoginModal && (
          <LoginModal
            stopNavigate={true}
            openLoginModal={openLoginModal}
            handleCancel={() => setOpenLoginModal(false)}
            handleRegister={() => setOpenSelectRegisterModal(true)}
            setOpenForgetPassModal={() => setOpenForgetPassModal(true)}
          />
        )}
        {!!openSelectRegisterModal && (
          <SelectRegisterModal
            openSelectRegisterModal={openSelectRegisterModal}
            handleCancel={() => setOpenSelectRegisterModal(false)}
            handleLogin={() => setOpenLoginModal(true)}
            handleRegisterUser={() => setOpenRegisterModal(true)}
            handleRegisterEnterprise={() =>
              setOpenRegisterEnterpriseModal(true)
            }
            setAccountType={setAccountType}
          />
        )}
        {!!openForgetPassModal && (
          <ForgetModal
            openForgetPassModal={openForgetPassModal}
            handleOk={() => {}}
            handleCancel={() => setOpenForgetPassModal(false)}
            handleLogin={() => setOpenLoginModal(true)}
            setOpenVerifyModal={() => setOpenVerifyModal(true)}
            setEmail={setEmail}
          />
        )}
        {!!openVerifyModal && (
          <VerifyForgetModal
            openVerifyModal={openVerifyModal}
            handleOk={() => {}}
            handleCancel={() => setOpenVerifyModal(false)}
            handleLogin={() => setOpenLoginModal(true)}
            setRePasswordModal={() => setRePasswordModal(true)}
            email={email}
            setCodeVerify={setCodeVerify}
          />
        )}
        {!!openRegisterEnterpriseModal && (
          <RegisterEnterpriseModal
            open={openRegisterEnterpriseModal}
            handleCancel={() => setOpenRegisterEnterpriseModal(false)}
            handleLogin={() => setOpenLoginModal(true)}
            AccountType={accountType}
          />
        )}
        {!!rePasswordModal && (
          <RePasswordModal
            rePasswordModal={rePasswordModal}
            handleOk={() => {}}
            handleCancel={() => setRePasswordModal(false)}
            handleLogin={() => setOpenLoginModal(true)}
            email={email}
            codeVerify={codeVerify}
          />
        )}
        {!!openRegisterModal && (
          <RegisterModal
            openRegisterModal={openRegisterModal}
            handleOk={() => {}}
            handleCancel={() => setOpenRegisterModal(false)}
            handleLogin={() => setOpenLoginModal(true)}
          />
        )}
      </Spin>
    </CommentWrapper>
  )
}

export default Comments
