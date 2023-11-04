import { Col, Empty, Image, Pagination, Row, Spin } from "antd"
import { useEffect, useState } from "react"
import LayoutCommon from "src/components/Common/Layout/index.js"
import PostService from "src/services/PostService"
import { PostPageStyle } from "./styled.js"
import FlInput from "src/components/FloatingLabel/Input/index.js"
import { FAILBACK } from "src/constants/constants.js"
import { fomatTimeFromNow } from "src/lib/time.js"
import NewsBadge from "./components/NewsBadge.js"
import { NewItemImage } from "./components/NewItemImage.js"

const PostPage = () => {
  const [loading, setLoading] = useState(false)
  const [listPost, setListPost] = useState([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    textSearch: "",
  })
  const getList = async () => {
    try {
      setLoading(true)
      const res = await PostService.getListPostHome(pagination)
      if (res.isError) return
      setListPost(res.Object?.data)
      setTotal(res.Object?.total)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getList()
  }, [pagination])
  return (
    <PostPageStyle>
      <Spin spinning={loading}>
        <LayoutCommon>
          <div className="d-flex justify-content-space-between title-page mb-24">
            <div className=" text-uppercase d-flex align-items-flex-end">
              Tin tức mới
            </div>
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
          </div>
          <Row gutter={[24, 24]}>
            {/* {listPost?.map(i => (
              <Col span={16} key={i?.id}>
                <div className="d-flex align-items-flex-start post-item">
                  <Image
                    preview={false}
                    fallback={FAILBACK}
                    src={i?.anh_mo_ta}
                    style={{ height: 200, width: "auto" }}
                    alt="anh"
                  />
                  <div className="ml-12 post-content">
                    <div className="post-title">{i?.tieu_de}</div>
                    <div className="max-line3" title={i?.tom_ta}>
                      {i?.tom_ta}
                    </div>
                  </div>
                </div>
              </Col>
            ))} */}
            {/* {!isMobile &&
              !isPost &&
              dataPost?.data &&
              dataPost?.data?.length ? (
                <Col span={24}>
                  <NewFourItem data={dataPost?.data?.slice(0, 4)} />
                </Col>
              ) : (
                // dataPost?.data?.slice(0, 5)?.map((i, idx) => <>a</>)
                <></>
              )} */}
            {listPost?.length ? (
              listPost?.map((i, idx) => (
                <Col span={16}>
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
                        content: i?.tom_ta,
                      }}
                      onClick={() => {
                        window.scrollTo({ top: 0, left: 0 })
                        // navigate(`/noi-dung/${i?.PostID}`)
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
          </Row>
        </LayoutCommon>
      </Spin>
    </PostPageStyle>
  )
}

export default PostPage
