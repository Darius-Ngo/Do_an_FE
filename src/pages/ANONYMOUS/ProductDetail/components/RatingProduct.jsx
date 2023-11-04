import {
  Avatar,
  Col,
  Empty,
  Image,
  Pagination,
  Progress,
  Rate,
  Row,
  Tabs,
} from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import SpinCustom from "src/components/Spin"
import { TabsNewsStyled } from "../../Home/styled"
import { RatingProductWrapper } from "../styled"
import RateService from "src/services/RateService"

function RatingProduct({ product }) {
  const [loading, setLoading] = useState(false)
  const [ratingDetail, setRatingDetail] = useState({})
  const [listRating, setListRating] = useState([])
  const [pagination, setPagination] = useState({
    starRating: 0,
    pageSize: 20,
    currentPage: 1,
  })
  const rating = [
    ratingDetail?.tong_1_sao,
    ratingDetail?.tong_2_sao,
    ratingDetail?.tong_3_sao,
    ratingDetail?.tong_4_sao,
    ratingDetail?.tong_5_sao,
  ]

  useEffect(() => {
    if ((product, pagination)) getListRating()
  }, [product, pagination])
  useEffect(() => {
    if (product) getRatingDetail()
  }, [product])

  const getRatingDetail = async () => {
    try {
      setLoading(true)
      const res = await RateService.getRateProduct({
        id_san_pham: product?.id,
      })
      if (res?.isError) return
      setRatingDetail(res?.Object)
    } finally {
      setLoading(false)
    }
  }
  const getListRating = async () => {
    try {
      setLoading(true)
      const res = await RateService.getListRatingProduct({
        id_san_pham: product?.id,
        ...pagination,
      })
      if (res?.isError) return
      setListRating(res?.Object)
    } finally {
      setLoading(false)
    }
  }

  const items = [
    {
      label: `Tất cả (${ratingDetail?.tong_danh_gia})`,
      key: 0,
      children: null,
    },
    {
      label: `5 sao (${rating[4]})`,
      key: 5,
      children: null,
    },
    {
      label: `4 sao (${rating[3]})`,
      key: 4,
      children: null,
    },
    {
      label: `3 sao (${rating[2]})`,
      key: 3,
      children: null,
    },
    {
      label: `2 sao (${rating[1]})`,
      key: 2,
      children: null,
    },
    {
      label: `1 sao (${rating[0]})`,
      key: 1,
      children: null,
    },
  ]

  return (
    <RatingProductWrapper>
      <SpinCustom spinning={loading}>
        <div>
          <div className="border-bottom" style={{ padding: "20px 0" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                margin: "0 30px",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <div style={{ fontWeight: "400", fontSize: "42px" }}>
                  {!!ratingDetail?.danh_gia_trung_binh
                    ? ratingDetail?.danh_gia_trung_binh?.toFixed(1)
                    : 0}
                </div>
                <div style={{ fontWeight: "400", fontSize: "30px" }}>/5</div>
              </div>
              <div className="averaging">
                <Rate
                  style={{
                    fontSize: 36,
                  }}
                  allowHalf
                  value={ratingDetail?.danh_gia_trung_binh}
                  disabled
                />
              </div>
              <div>{ratingDetail?.tong_danh_gia} đánh giá</div>
            </div>
            <div className="progress-rating">
              {rating.map((item, idx) => {
                return (
                  <div className="d-flex align-items-center">
                    <Rate allowHalf value={idx + 1} disabled />
                    <Progress
                      percent={(item / ratingDetail?.tong_danh_gia) * 100}
                      showInfo={false}
                      strokeColor="#FFD600"
                      style={{ width: "150px", margin: "0px 0px 0px 8px" }}
                    />
                    <div className="ml-16 fs-13">
                      {(item / ratingDetail?.tong_danh_gia) * 100 || 0} %
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="border-bottom">
            <Row
              className="d-flex align-items-center justify-content-space-between w-100"
              gutter={20}
            >
              {/* <Col className="ml-20 mr-40 fw-600" style={{ width: "auto" }}>
                Đánh giá sản phẩm
              </Col> */}
              <Col flex={"auto"} style={{ width: 0 }}>
                <TabsNewsStyled>
                  <Tabs
                    items={items}
                    activeKey={pagination?.starRating}
                    onChange={starRating =>
                      setPagination(pre => ({
                        ...pre,
                        currentPage: 1,
                        starRating,
                      }))
                    }
                  />
                </TabsNewsStyled>
              </Col>
            </Row>
          </div>
          {listRating?.data?.length ? (
            <>
              <div style={{ maxHeight: 488, overflowY: "auto" }}>
                {listRating?.data?.map(item => {
                  return (
                    <Row
                      gutter={16}
                      className="border-bottom"
                      style={{ padding: "20px", margin: 0 }}
                      key={item?.id}
                    >
                      <Col span={2}>
                        <Avatar
                          src={item.avatar}
                          alt=""
                          loading="lazy"
                          size={40}
                        />
                      </Col>
                      <Col span={22}>
                        <div className="username fs-14 fw-600">
                          {item.ho_ten}
                          <span
                            className="fs-12 ml-20"
                            style={{ color: "#999" }}
                          >
                            {!!item.thoi_gian_nx &&
                              moment(item.thoi_gian_nx)?.format(
                                "HH:mm DD/MM/YYYY",
                              )}
                          </span>
                        </div>
                        <Rate
                          value={item.danh_gia}
                          disabled
                          style={{ fontSize: 13 }}
                        />
                        <div className="content-comment">{item.noi_dung}</div>
                        <Image.PreviewGroup>
                          <Row
                            style={{ flexWrap: "nowrap", overflow: "auto" }}
                            gutter={16}
                            className="image-review"
                          >
                            {item?.anh_mo_ta?.map((item, idx) => (
                              <Col
                                className="image-box mr-10"
                                key={"img" + idx}
                              >
                                <Image
                                  width={100}
                                  src={`${process.env.REACT_APP_API_ROOT}/${item}`}
                                />
                              </Col>
                            ))}
                            {item?.video_mo_ta?.map((item, idx) => (
                              <Col
                                className="image-box mr-10"
                                key={"vio" + idx}
                              >
                                <ReactPlayer
                                  url={`${process.env.REACT_APP_API_ROOT}/${item}`}
                                  width="100px"
                                  height="100px"
                                  playing={false}
                                  controls={true}
                                />
                              </Col>
                            ))}
                          </Row>
                        </Image.PreviewGroup>
                      </Col>
                    </Row>
                  )
                })}
              </div>
              {listRating?.total > 10 && (
                <div className="d-flex justify-content-flex-end m-10">
                  <Pagination
                    current={pagination?.currentPage}
                    pageSize={pagination?.pageSize}
                    onChange={(page, pageSize) =>
                      setPagination(pre => ({
                        ...pre,
                        pageSize: pageSize,
                        currentPage: page,
                      }))
                    }
                    total={ratingDetail?.total}
                  />
                </div>
              )}
            </>
          ) : (
            <Empty description="Chưa có đánh giá" className="mb-24 mt-24" />
          )}
        </div>
      </SpinCustom>
    </RatingProductWrapper>
  )
}

export default RatingProduct
