import { Col, Divider, Row, Space, Spin, Tabs } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import LayoutCommon from "src/components/Common/Layout"
import Button from "src/components/MyButton/Button"
import { COLOR_STATUS_ORDER, SIZE_PRODUCT } from "src/constants/constants"
import { formatMoneyVND } from "src/lib/utils"
import OrderService from "src/services/OrderService"
import OrderDetail from "./components/OrderDetail"
import { ConfirmOrderStyle } from "./styled"
import Notice from "src/components/Notice"
import windowSize from "src/lib/useWindowSize"
import CB1 from "src/components/Modal/CB1"
import CancelOrder from "../OrderManager/components/CancelOrder"

const ConfirmOrder = () => {
  const { userInfo } = useSelector(state => state.appGlobal)
  const [loading, setLoading] = useState(false)
  const [listOrder, setListOrder] = useState([])
  const [total, setTotal] = useState(0)
  const [openDetail, setOpenDetail] = useState(false)
  const [openCancelOrder, setOpenCancelOrder] = useState(false)
  const [condition, setCondition] = useState({
    status: 3,
    // currentPage: 1,
    // pageSize: 10,
  })
  let isMobile = windowSize.isMobile()

  const getListOrder = async () => {
    try {
      setLoading(true)
      const res = await OrderService.getListOrderUser(condition)
      if (res.isError) return
      setListOrder(res.Object?.data)
      setTotal(res.Object?.total)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getListOrder()
  }, [condition])

  const updateStatus = async record => {
    try {
      setLoading(true)
      const res = await OrderService.updateStatus({
        id: record.id,
        trang_thai: record.chuyen_tt,
        id_nguoi_cap_nhat: userInfo.id,
      })
      if (res.isError) return
      Notice({
        msg: "Cập nhật trạng thái đơn hàng thành công.",
      })
      getListOrder()
    } finally {
      setLoading(false)
    }
  }

  const setBtn = (item, data) => (
    <>
      {/* {item?.giao_that_bai && ( */}
      <Button
        btnType="red-style"
        onClick={() => {
          setOpenCancelOrder({
            ...data,
            chuyen_tt: 6,
          })
        }}
      >
        Giao không thành công
      </Button>
      {/* )} */}
      {/* {item?.da_giao && ( */}
      <Button
        btnType="orange"
        onClick={() =>
          CB1({
            data,
            title: `Bạn có chắc chắn muốn chuyển trạng thái đơn hàng
            "<strong> ${data?.ma_don_hang}</strong>" thành "<strong>Đã giao</strong>" không?`,
            icon: "check-box-learn",
            okText: "Đồng ý",
            onOk: async close => {
              updateStatus({
                ...data,
                chuyen_tt: 4,
              })
              close()
            },
          })
        }
      >
        Đã giao
      </Button>
      {/* )} */}
    </>
  )
  return (
    <LayoutCommon>
      <Spin spinning={loading}>
        <ConfirmOrderStyle>
          <div
            className="fs-22 fw-600 mb-16"
            style={{ color: "var(--color-brown)" }}
          >
            Danh sách đơn ({total})
          </div>
          <Row
            gutter={isMobile ? [8, 8] : [16, 16]}
            className="list-order"
            style={isMobile ? { maxWidth: "calc(100vw - 24px)" } : {}}
          >
            {!!listOrder?.length &&
              listOrder.map(item => (
                <Col span={24} className="order-item" key={item?.id}>
                  {isMobile && (
                    <div>
                      <div className="d-flex align-items-center p-12 fs-14 fw-600">
                        Mã đơn: {item?.ma_don_hang}
                      </div>
                      <Divider className="m-0 mb-12" />
                    </div>
                  )}
                  <Row
                    gutter={16}
                    className="list-product pointer"
                    onClick={() => setOpenDetail(item)}
                  >
                    <Col flex={"auto"} style={{ width: 0 }} className="flex-1">
                      {item?.list_product?.map(i => (
                        <div className="product-item d-flex">
                          <img src={i?.anh} alt="" className="img-product" />
                          <div className="mt-16">
                            <div className="product-name">
                              {i?.ten_san_pham}
                            </div>
                            <div className="quantity">
                              x {i?.so_luong} {SIZE_PRODUCT[i?.kich_co]}
                            </div>
                            <div className="d-flex align-items-flex-end">
                              <div className="product-price">
                                {formatMoneyVND(i?.gia_ban)}
                              </div>
                              <del className="sub-color fs-12 ml-8">
                                {!!i?.gia_ban_goc
                                  ? formatMoneyVND(i?.gia_ban_goc)
                                  : ""}
                              </del>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Col>
                    {!isMobile && (
                      <Col
                        style={{ width: "auto" }}
                        className=" pr-24 pt-24 pb-16 d-flex flex-column justify-content-space-between align-items-flex-end"
                      >
                        <Space className="align-items-center">
                          <div className="sub-color">{item?.ma_don_hang}</div>
                          <Divider type="vertical" />
                          <div
                            className="fw-600"
                            style={{
                              color: COLOR_STATUS_ORDER[item.trang_thai],
                            }}
                          >
                            {item?.ten_trang_thai}
                          </div>
                        </Space>
                        <div className="d-flex fw-600 ">
                          Tổng cộng:{" "}
                          <span
                            className="fs-16 ml-12"
                            style={{ color: "var(--color-red-500)" }}
                          >
                            {formatMoneyVND(item?.tong_tien)}
                          </span>
                        </div>
                      </Col>
                    )}
                  </Row>
                  {isMobile && (
                    <>
                      <div className="d-flex fw-600 pl-12">
                        Tổng cộng:{" "}
                        <span
                          className="fs-16 ml-12"
                          style={{ color: "var(--color-red-500)" }}
                        >
                          {formatMoneyVND(item?.tong_tien)}
                        </span>
                      </div>
                      <Divider className="mv-12" />
                    </>
                  )}
                  <Space
                    size={16}
                    className="justify-content-flex-end w-100 pr-12"
                  >
                    {setBtn(item?.list_btns, item)}
                  </Space>
                </Col>
              ))}
          </Row>
        </ConfirmOrderStyle>
      </Spin>
      {!!openDetail && (
        <OrderDetail
          detail={openDetail}
          open={openDetail}
          onCancel={() => setOpenDetail(false)}
          setBtn={() => setBtn(openDetail?.list_btns, openDetail)}
        />
      )}
      {!!openCancelOrder && (
        <CancelOrder
          open={openCancelOrder}
          onCancel={() => setOpenCancelOrder(false)}
          onOk={() => {
            getListOrder()
          }}
        />
      )}
    </LayoutCommon>
  )
}

export default ConfirmOrder
