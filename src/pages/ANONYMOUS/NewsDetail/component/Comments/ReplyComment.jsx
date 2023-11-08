import { Avatar, Col, Row } from "antd"
import { useState } from "react"
import SvgIcon from "src/components/SvgIcon"
import STORAGE, { getStorage } from "src/lib/storage"
import { CommentWrapper } from "./styled"

const ReplyComment = ({
  item,
  likeComment,
  replyComment,
  expandComment,
  setExpandComment,
}) => {
  const isLogin = getStorage(STORAGE.TOKEN)
  return (
    <CommentWrapper style={{ margin: "8px 0" }}>
      <Row style={{ margin: 0 }} key={item?.PostCommentID}>
        <Col flex="40px" style={{ marginRight: "10px" }}>
          <Avatar src={item?.Avatar} alt="" loading="lazy" width={40} />
        </Col>
        <Col flex="auto">
          <div className={`content-comment `} style={{ textAlign: "justify" }}>
            <span
              className={
                !!expandComment?.find(
                  j => j?.PostCommentID === item?.PostCommentID,
                )?.expandContent
                  ? ""
                  : "max-line4"
              }
            >
              <b>{item?.FullName}: </b> {item?.Content}
            </span>
            {!!expandComment?.find(
              j => j?.PostCommentID === item?.PostCommentID,
            )?.expand && (
              <>
                {!expandComment?.find(
                  j => j?.PostCommentID === item?.PostCommentID,
                )?.expandContent ? (
                  <span
                    style={{ color: "#008dd6" }}
                    className="pointer expand-hover"
                    onClick={() => {
                      setExpandComment(prev => [
                        ...prev?.filter(
                          j => j?.PostCommentID !== item?.PostCommentID,
                        ),
                        {
                          PostCommentID: item?.PostCommentID,
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
                          j => j?.PostCommentID !== item?.PostCommentID,
                        ),
                        {
                          PostCommentID: item?.PostCommentID,
                          expandContent: false,
                          expand: true,
                        },
                      ])
                    }}
                  >{` << Thu gọn`}</span>
                )}
              </>
            )}
          </div>
          {/* <span className="content-comment-expand"> {`Xem thêm>>`}</span> */}
          <div className="social-option">
            <div className="d-flex">
              <SvgIcon
                name={`${item?.IsLike ? "liked" : "react-like-fb"}`}
                onClick={() =>
                  !!isLogin && likeComment(item?.IsLike, item?.PostCommentID)
                }
                style={{ marginRight: "5px", cursor: "pointer" }}
              />
              <div className="border-bottom-1">{item?.NumberLike}</div>
            </div>

            <div
              className="mb-24 border-bottom-1"
              onClick={e => {
                replyComment(item)
              }}
            >
              Trả lời
            </div>
            <div style={{ marginLeft: "24px" }} className="border-bottom-1">
              {item?.TimeExistence}
            </div>
          </div>
        </Col>
      </Row>
    </CommentWrapper>
  )
}

export default ReplyComment
