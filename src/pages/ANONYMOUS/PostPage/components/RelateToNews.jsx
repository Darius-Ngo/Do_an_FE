import { Col, Divider, Row, Spin } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SvgIcon from "src/components/SvgIcon"
import { formatDateAndTime } from "src/lib/dateFormatters"
import useWindowSize from "src/lib/useWindowSize"
import TagService from "src/services/TagService"
import { RelateNewsStyled } from "../styled"
import PostService from "src/services/PostService"
import ROUTER from "src/router"
import { setTagID } from "src/redux/post"
import { useDispatch } from "react-redux"

const RelateToNews = ({ list }) => {
  const [loading, setLoading] = useState(false)
  const [listPostPopular, setListPostPopular] = useState([])
  const [listTags, setListTags] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isMobile = !!useWindowSize.isMobile()
  const getListTags = async () => {
    try {
      setLoading(true)
      const res = await TagService.getListTags({
        pageSize: 5,
        currentPage: 1,
      })
      if (res?.isError) return
      setListTags(res?.Object?.data)
    } finally {
      setLoading(false)
    }
  }
  const getListPostPopular = async () => {
    try {
      setLoading(true)
      const res = await PostService.getListPostPopular({
        pageSize: 5,
        currentPage: 1,
      })
      if (res?.isError) return
      setListPostPopular(res?.Object)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListPostPopular()
    getListTags()
  }, [])

  return (
    <RelateNewsStyled className={!!isMobile ? "mt-16" : ""}>
      <Spin spinning={loading}>
        <div className="" style={{ border: "1px solid #f0f0f0" }}>
          <div
            className="relate-news-header"
            style={{ backgroundColor: "var(--color-orange)" }}
          >
            <div className="relate-news-header-text" style={{ color: "#fff" }}>
              Danh mục bài viết
            </div>
            <div
              className="relate-news-header-space"
              style={{ borderColor: "#fff" }}
            />
          </div>
          <div className="relate-news-content pt-16 pb-16 pl-30 pr-30">
            <div className="relate-news-text-care mb-10 mt-10">
              Nhiều người quan tâm
            </div>
            {listPostPopular?.length ? (
              listPostPopular?.map((i, idx) => (
                <div
                // time={i?.ngay_dang}
                // placement={"end"}
                // key={`RelateToNews${idx}`}
                >
                  <div
                    className="relate-news-box-care pointer"
                    onClick={() => {
                      window.scrollTo({ top: 0, left: 0 })
                      navigate(ROUTER.CHI_TIET_TIN_TUC, {
                        state: i,
                      })
                    }}
                  >
                    <div className="relate-news-box-care-title">
                      {i?.tieu_de}
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div className="relate-news-box-care-time mr-8">
                        {formatDateAndTime(i?.ngay_dang)}
                      </div>
                      <div className="d-flex">
                        <SvgIcon
                          name="mode-comment"
                          style={{ margin: "0 6px 0 0px" }}
                        />
                        <div className="number-comment">{i?.luot_xem}</div>
                        <div className="d-flex">
                          <SvgIcon
                            name="view"
                            style={{ margin: "0 6px 0 10px" }}
                          />
                          <div className="number-comment">
                            {/* {!!item?.NumberOfViewers ? item?.NumberOfViewers : 0} */}
                            {i?.luot_xem}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Divider
                      className="mt-5 mb-5"
                      style={{ borderTopWidth: idx === 2 ? 4 : 1 }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
            <div className="relate-news-text-care">Tags phổ biến</div>
            <Row gutter={[12, 24]} className="mt-24">
              {!!listTags?.length ? (
                listTags?.map((i, idx) => (
                  <Col
                    key={`tag123123${idx}`}
                    onClick={() => {
                      dispatch(setTagID(i.id))
                      window.scrollTo({
                        top: 0,
                        left: 0,
                      })
                    }}
                  >
                    <div className="relate-news-tag pointer">{i?.ten_the}</div>
                  </Col>
                ))
              ) : (
                <></>
              )}
            </Row>
            <Divider style={{ borderTopWidth: 4 }} />
          </div>
        </div>
      </Spin>
    </RelateNewsStyled>
  )
}

export default RelateToNews
