import {
  Avatar,
  Col,
  ConfigProvider,
  Row,
  Space,
  Spin,
  Table,
  Tabs,
} from "antd"
import React, { useState, useEffect } from "react"
import moment from "moment"
import CustomModal from "src/components/Modal/CustomModal"
import { ModalDetailStyle } from "../styled"
import Button from "src/components/MyButton/Button"
import OrderService from "src/services/OrderService"
import { formatMoneyVND } from "src/lib/utils"
import { UserOutlined } from "@ant-design/icons"
import { COLOR_STATUS_ORDER } from "src/constants/constants"

const ModalOrderDetail = ({ open, onCancel, setBtns }) => {
  const [loading, setLoading] = useState(false)
  const [orderDetail, setOrderDetail] = useState({})
  const [detailUpdate, setDetailUpdate] = useState([])
  const [tabActive, setTabActive] = useState(1)

  const getDetail = async () => {
    try {
      setLoading(true)
      const res = await OrderService.getDetailOrder({
        id_don_hang: open.id,
      })
      if (res.isError) return
      setOrderDetail(res.Object)
    } finally {
      setLoading(false)
    }
  }
  const getDetailUpdate = async () => {
    try {
      setLoading(true)
      const res = await OrderService.getDetailUpdate({
        id_don_hang: open.id,
      })
      if (res.isError) return
      setDetailUpdate(res.Object)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDetail()
    getDetailUpdate()
  }, [open])

  const sharedOnCell = (record, index) => {
    if (record.key === "total") {
      return {
        colSpan: 0,
      }
    }
    return {}
  }
  const columns = [
    {
      title: "STT",
      onCell: sharedOnCell,
      render: (_, record, idx) => <div className="text-center">{idx + 1}</div>,
      key: "id",
      width: 60,
    },
    {
      title: "Tên sản phẩm",
      key: "ten_san_pham",
      dataIndex: "ten_san_pham",
      align: "center",
      onCell: (record, index) => ({
        colSpan: record.key === "total" ? 5 : 1,
      }),
      width: 200,
      render: (val, record) => (
        <span className={record.key === "total" ? "fw-600" : ""}>{val}</span>
      ),
    },
    {
      title: "Kích cỡ",
      dataIndex: "ten_kich_co",
      key: "ten_kich_co",
      align: "center",
      width: 120,
      onCell: sharedOnCell,
    },
    {
      title: "Giá bán",
      dataIndex: "gia_ban",
      key: "gia_ban",
      align: "center",
      width: 200,
      onCell: sharedOnCell,
      render: (val, record) => (
        <div className="d-flex align-items-flex-end">
          <div className="fw-600 mr-10">{formatMoneyVND(val)}</div>
          <del className="sub-color fs-12 ">
            {!!record?.gia_ban_goc ? formatMoneyVND(record?.gia_ban_goc) : ""}
          </del>
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "so_luong",
      key: "so_luong",
      align: "center",
      width: 120,
      onCell: sharedOnCell,
    },
    {
      title: "Tổng giá sản phẩm",
      key: "tongGia",
      dataIndex: "tongGia",
      align: "center",
      width: 240,
      render: (val, record) => (
        <div className="fw-600">
          {val ? (
            <span style={{ color: "var(--color-red-500)", fontWeight: 600 }}>
              {val}
            </span>
          ) : record?.gia_ban * record?.so_luong ? (
            formatMoneyVND(record?.gia_ban * record?.so_luong)
          ) : (
            ""
          )}
        </div>
      ),
    },
  ]

  const listAction = [
    "",
    "Đặt hàng",
    "Xác nhận đơn hàng",
    'Chuyển trạng thái đơn thành "đang giao"',
    'Chuyển trạng thái đơn thành "đã giao"',
    "Đánh giá đơn hàng",
    "Hủy đơn hàng",
  ]

  const renderFooter = () => (
    <div className="d-flex justify-content-space-between">
      <Button btnType="gray-style" onClick={onCancel}>
        Đóng
      </Button>
      <Space>
        {setBtns()?.map(
          i =>
            i?.enable && (
              <Button btnType={i.btnType} onClick={i?.onClick}>
                {i?.title}
              </Button>
            ),
        )}
      </Space>
    </div>
  )
  return (
    <CustomModal
      title={false}
      footer={renderFooter()}
      width={1024}
      open={open}
      onCancel={onCancel}
    >
      <Spin spinning={loading}>
        <Tabs
          activeKey={tabActive}
          onChange={key => setTabActive(key)}
          items={[
            {
              label: "Thông tin đơn hàng",
              key: 1,
            },
            {
              label: "Chi tiết cập nhật",
              key: 2,
            },
          ]}
        />
        <ModalDetailStyle>
          {tabActive === 1 ? (
            <>
              <div className="title text-center">THÔNG TIN ĐƠN HÀNG</div>
              <div className="content-info">
                <Row gutter={16}>
                  <Col span={8} className="info-item">
                    <span className="info-title">Mã đơn hàng: </span>
                    <span className="info-content">{open?.ma_don_hang}</span>
                  </Col>
                  <Col span={8} className="info-item">
                    <span className="info-title">Trạng thái: </span>
                    <span
                      className="info-content ml-4"
                      style={{ color: COLOR_STATUS_ORDER[open?.trang_thai] }}
                    >
                      {open?.ten_trang_thai}
                    </span>
                  </Col>
                  <Col span={8} className="info-item">
                    <span className="info-title">Thời gian đặt hàng: </span>
                    <span className="info-content">
                      {moment(open?.thoi_gian_dat).format("HH:mm DD/MM/YYYY")}
                    </span>
                  </Col>
                </Row>
                <Row gutter={16} className="info-row">
                  <Col span={8} className="info-item">
                    <span className="info-title">Người đặt hàng: </span>
                    <span className="info-content">{open?.ten_nguoi_dat}</span>
                  </Col>
                  <Col span={8} className="info-item">
                    <span className="info-title">SĐT người đặt: </span>
                    <span className="info-content">{open?.sdt_nguoi_dat}</span>
                  </Col>
                  <Col span={8} className="info-item">
                    <span className="info-title">Gmail người đặt: </span>
                    <span className="info-content">
                      {open?.email_nguoi_dat}
                    </span>
                  </Col>
                </Row>
                <Row gutter={16} className="info-row">
                  <Col span={8} className="info-item">
                    <span className="info-title">Người nhận: </span>
                    <span className="info-content">{open?.ten_nguoi_nhan}</span>
                  </Col>
                  <Col span={8} className="info-item">
                    <span className="info-title">SĐT người nhận: </span>
                    <span className="info-content">{open?.sdt_nguoi_nhan}</span>
                  </Col>
                  <Col span={24} className="info-item">
                    <span className="info-title">Địa chỉ giao hàng: </span>
                    <span className="info-content">
                      {open?.dia_chi_nhan_hang}
                    </span>
                  </Col>
                  <Col span={24} className="info-item">
                    <span className="info-title">Ghi chú: </span>
                    <span className="info-content">{open?.ghi_chu}</span>
                  </Col>
                </Row>
              </div>
              <div className="title">Danh sách sản phẩm: </div>
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      rowHoverBg: "#fff",
                    },
                  },
                }}
              >
                <Table
                  columns={columns}
                  // bordered
                  rowKey="id"
                  pagination={false}
                  dataSource={orderDetail?.ds_san_pham?.concat(
                    (() => {
                      let tongGia = 0
                      for (let row of orderDetail?.ds_san_pham) {
                        tongGia += row["so_luong"] * row["gia_ban"]
                      }
                      return {
                        key: "total",
                        ten_san_pham: "Tổng thanh toán: ",
                        tongGia: formatMoneyVND(tongGia),
                      }
                    })(),
                  )}
                />
              </ConfigProvider>
            </>
          ) : (
            <div className="info-update">
              <div className="info-item">
                <div className="d-flex align-items-center">
                  <Avatar
                    size={24}
                    icon={<UserOutlined />}
                    src={orderDetail?.avatar_nguoi_dat}
                  />
                  <div className="mr-16 ml-8">
                    <span className="fw-600">Khách hàng:</span>{" "}
                    {open?.ten_nguoi_dat}
                  </div>
                  <div className="fs-12" style={{ color: "#999" }}>
                    {moment(open?.thoi_gian_dat)?.format("HH:mm DD/MM/YYYY")}
                  </div>
                </div>
                <div className="mt-12 ml-24">- Đặt hàng</div>
              </div>
              {detailUpdate?.map(i => (
                <div className="info-item" key={i.id}>
                  <div className="d-flex align-items-center">
                    <Avatar size={24} icon={<UserOutlined />} src={i?.avatar} />
                    <div className="mr-16 ml-8">
                      <span className="fw-600">{i.ten_phan_quyen}:</span>{" "}
                      {i?.ho_ten}
                    </div>
                    <div className="fs-12" style={{ color: "#999" }}>
                      {moment(i?.thoi_gian_cap_nhat)?.format(
                        "HH:mm DD/MM/YYYY",
                      )}
                    </div>
                  </div>
                  <div className=" mt-12 ml-24">
                    - {listAction[i.trang_thai]}{" "}
                    {i.trang_thai === 6
                      ? `: ${orderDetail?.ly_do_huy_don}`
                      : ""}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ModalDetailStyle>
      </Spin>
    </CustomModal>
  )
}

export default ModalOrderDetail
