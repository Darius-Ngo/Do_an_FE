import { Col, Empty, Image, Pagination, Row, Select, Space, Spin } from "antd"
import { useEffect, useState } from "react"
import LayoutCommon from "src/components/Common/Layout/index.js"
import PostService from "src/services/PostService"
import { PostPageStyle } from "./styled.js"
import FlInput from "src/components/FloatingLabel/Input/index.js"
import { fomatTimeFromNow } from "src/lib/time.js"
import { useNavigate } from "react-router-dom"
import ROUTER from "src/router/index.js"
import NewsBadge from "./components/NewsBadge.jsx"
import { NewItemImage } from "./components/NewItemImage.jsx"
import RelateToNews from "./components/RelateToNews.jsx"
import FlSelect from "src/components/FloatingLabel/Select/index.js"
import TagService from "src/services/TagService/index.js"
import { useDispatch, useSelector } from "react-redux"
import { setTagID } from "src/redux/post.js"

const PostPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { tagID } = useSelector(state => state.post)
  const [loading, setLoading] = useState(false)
  const [listPost, setListPost] = useState([])
  const [listTags, setListTags] = useState([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    textSearch: "",
  })
  const getListCombobox = async () => {
    try {
      setLoading(true)
      const res = await TagService.getListCombobox()
      if (res.isError) return
      setListTags(res.Object)
    } finally {
      setLoading(false)
    }
  }
  const getList = async () => {
    try {
      setLoading(true)
      const res = await PostService.getListPostHome({
        ...pagination,
        id_the: tagID,
      })
      if (res.isError) return
      setListPost(res.Object?.data)
      setTotal(res.Object?.total)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getList()
  }, [pagination, tagID])
  useEffect(() => {
    getListCombobox()
  }, [])
  return (
    <PostPageStyle>
      <Spin spinning={loading}>
        <LayoutCommon>
          <div className="d-flex justify-content-space-between title-page mb-24">
            <div className="text-uppercase d-flex align-items-flex-end">
              Tin tức mới
            </div>
            <Space size={12}>
              <FlInput
                label="Tìm kiếm bài viết"
                search
                style={{ width: 450 }}
                onSearch={textSearch =>
                  setPagination({
                    currentPage: 1,
                    textSearch,
                  })
                }
              />
              <FlSelect
                label={"Tags"}
                style={{ width: 200 }}
                showSearch
                value={tagID}
                onChange={val => dispatch(setTagID(val))}
                allowClear
              >
                {listTags.map(i => (
                  <Select.Option key={i?.id} value={i?.id}>
                    {i?.ten_the}
                  </Select.Option>
                ))}
              </FlSelect>
            </Space>
          </div>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={16} gutter={[24, 24]}>
              {listPost?.length ? (
                listPost?.map((i, idx) => (
                  <Col span={24}>
                    <NewsBadge
                      time={i?.ngay_dang}
                      key={i?.id}
                      placement={"start"}
                    >
                      <NewItemImage
                        item={{
                          ...i,
                          image: i?.anh_mo_ta,
                          title: i?.tieu_de,
                          time: i?.ngay_dang && fomatTimeFromNow(i?.ngay_dang),
                          content: i?.tom_tat,
                        }}
                        onClick={() => {
                          window.scrollTo({ top: 0, left: 0 })
                          navigate(ROUTER.CHI_TIET_TIN_TUC, {
                            state: i,
                          })
                        }}
                      />
                    </NewsBadge>
                  </Col>
                ))
              ) : (
                <Empty description="Không có bài viết" />
              )}
              {total > 10 && (
                <div className="d-flex justify-content-flex-end">
                  <Pagination
                    className="d-flex"
                    total={total}
                    hideOnSinglePage={total <= 10}
                    current={pagination?.currentPage}
                    pageSize={pagination?.pageSize || 1}
                    responsive
                    locale={{ items_per_page: "" }}
                    showSizeChanger={total > 10}
                    onChange={(currentPage, pageSize) =>
                      setPagination({
                        ...pagination,
                        currentPage,
                        pageSize,
                      })
                    }
                  />
                </div>
              )}
            </Col>
            <Col xs={24} md={8}>
              <RelateToNews list={listPost} />
            </Col>
          </Row>
        </LayoutCommon>
      </Spin>
    </PostPageStyle>
  )
}

export default PostPage
