import moment from "moment"
import React, { useEffect, useState } from "react"
import ModalOrderDetail from "./components/ModalOrderDetail"
import { OrderManagerStyle } from "./styled"
import SpinCustom from "src/components/Spin"
import TableCustom from "src/components/Table/CustomTable"
import Button from "src/components/MyButton/Button"
import OrderService from "src/services/OrderService"
import { Space, Tabs } from "antd"
import { useSelector } from "react-redux"
import { formatMoney } from "src/lib/utils"
import {
  MainTableData,
  MainTableHeader,
  SubTableData,
  SubTableHeader,
} from "src/components/Table/CustomTable/styled"
import { COLOR_STATUS_ORDER } from "src/constants/constants"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import CB1 from "src/components/Modal/CB1"
import Notice from "src/components/Notice"
import CancelOrder from "./components/CancelOrder"
import ModalViewRate from "src/pages/USER/ListOrdered/components/ModalViewRate"

const OrderManager = () => {
  const { userInfo } = useSelector(state => state.appGlobal)
  const [loading, setLoading] = useState(false)
  const [showModalDetail, setShowModalDetail] = useState(false)
  const [listOrder, setListOrder] = useState([])
  const [total, setTotal] = useState(0)
  const [listStatus, setListStatus] = useState([])
  const [openCancelOrder, setOpenCancelOrder] = useState(false)
  const [openViewRate, setOpenViewRate] = useState(false)
  const [condition, setCondition] = useState({
    pageSize: 20,
    currentPage: 1,
    status: 0,
    textSearch: "",
  })

  const getTotalStatus = async () => {
    try {
      setLoading(true)
      const res = await OrderService.getTotalStatus()
      if (res.isError) return
      setListStatus(res.Object)
    } finally {
      setLoading(false)
    }
  }
  const getListOrder = async () => {
    try {
      setLoading(true)
      const res = await OrderService.getListOrderManager(condition)
      if (res.isError) return
      setListOrder(res.Object?.data)
      setTotal(res.Object?.total)
      if (showModalDetail)
        setShowModalDetail(
          res.Object?.data?.find(i => i.id === showModalDetail.id),
        )
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getTotalStatus()
  }, [])
  useEffect(() => {
    getListOrder()
  }, [condition])

  const updateStatus = async record => {
    try {
      setLoading(true)
      console.log("record", record)
      const res = await OrderService.updateStatus({
        id: record.id,
        trang_thai: record.chuyen_tt,
        id_nguoi_cap_nhat: userInfo.id,
      })
      if (res.isError) return
      Notice({
        msg: "Cập nhật trạng thái đơn hàng thành công.",
      })
      getTotalStatus()
      getListOrder()
    } finally {
      setLoading(false)
    }
  }

  const setBtns = (item, data) => [
    {
      enable: item?.giao_hang,
      title: "Đang giao",
      icon: "shipping",
      onClick: () => {
        CB1({
          data,
          title: `Bạn có chắc chắn muốn chuyển trạng thái đơn hàng
          "<strong> ${data?.ma_don_hang}</strong>" thành "<strong>Đang giao</strong>" không?`,
          icon: "shipping",
          okText: "Đồng ý",
          onOk: async close => {
            updateStatus({
              ...data,
              chuyen_tt: item?.giao_hang?.chuyen_tt,
            })
            close()
          },
        })
      },
    },
    {
      enable: item?.da_giao,
      title: "Đã giao",
      icon: "check-box-learn",
      onClick: () => {
        CB1({
          data,
          title: `Bạn có chắc chắn muốn chuyển trạng thái đơn hàng
          "<strong> ${data?.ma_don_hang}</strong>" thành "<strong>Đã giao</strong>" không?`,
          icon: "check-box-learn",
          okText: "Đồng ý",
          onOk: async close => {
            updateStatus({
              ...data,
              chuyen_tt: item?.da_giao?.chuyen_tt,
            })
            close()
          },
        })
      },
    },
    {
      enable: item?.xac_nhan,
      title: "Xác nhận đơn",
      icon: "check-circle",
      onClick: () => {
        CB1({
          data,
          title: `Bạn có chắc chắn muốn xác nhận đơn đơn hàng
          "<strong> ${data?.ma_don_hang}</strong>" không?`,
          icon: "check-circle",
          okText: "Đồng ý",
          onOk: async close => {
            updateStatus({
              ...data,
              chuyen_tt: item?.xac_nhan?.chuyen_tt,
            })
            close()
          },
        })
      },
    },
    {
      enable: item?.huy_don,
      title: "Hủy đơn",
      icon: "cancel",
      onClick: () => {
        setOpenCancelOrder({
          ...data,
          chuyen_tt: item?.huy_don?.chuyen_tt,
        })
      },
    },
    {
      enable: !!data?.da_danh_gia,
      title: "Xem đánh giá",
      icon: "star-yellow",
      onClick: () => setOpenViewRate(data),
    },
    // {
    //   enable: item?.xem_ly_do_huy,
    //   title: "Xem lý do hủy đơn",
    //   icon: "emptySign",
    //   onClick: () => {
    //     setViewReason(data)
    //   },
    // },
  ]

  const columns = [
    {
      title: "STT",
      key: "stt",
      dataIndex: "stt",
      render: (val, record, idx) => (
        <div className="text-center">
          {idx + 1 + condition?.pageSize * (condition?.currentPage - 1)}
        </div>
      ),
      width: 60,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "ma_don_hang",
      key: "ma_don_hang",
      align: "left",
      width: 130,
    },
    {
      title: (
        <>
          <MainTableHeader>Người đặt hàng</MainTableHeader>
          <SubTableHeader>SĐT người đặt</SubTableHeader>
        </>
      ),
      dataIndex: "ten_nguoi_dat",
      key: "ten_nguoi_dat",
      width: 160,
      align: "left",
      render: (val, record) => (
        <>
          <MainTableData>{val}</MainTableData>
          <SubTableData>{record?.sdt_nguoi_dat}</SubTableData>
        </>
      ),
    },
    {
      title: (
        <>
          <MainTableHeader>Người nhận</MainTableHeader>
          <SubTableHeader>SĐT nhận hàng</SubTableHeader>
        </>
      ),
      dataIndex: "ten_nguoi_nhan",
      key: "ten_nguoi_nhan",
      width: 160,
      align: "left",
      render: (val, record) => (
        <>
          <MainTableData>{val}</MainTableData>
          <SubTableData>{record?.sdt_nguoi_nhan}</SubTableData>
        </>
      ),
    },
    {
      title: "Thời gian đặt",
      dataIndex: "thoi_gian_dat",
      key: "thoi_gian_dat",
      align: "left",
      width: 150,
      render: record => {
        const date = moment(new Date(record)).format("HH:MM DD/MM/YYYY")
        return <div>{date}</div>
      },
    },
    {
      title: "Đơn giá (VNĐ)",
      dataIndex: "tong_tien",
      key: "tong_tien",
      align: "left",
      width: 150,
      render: value => <div>{formatMoney(value)}</div>,
    },
    {
      title: "Địa chỉ nhận hàng",
      dataIndex: "dia_chi_nhan_hang",
      key: "dia_chi_nhan_hang",
      align: "left",
      render: value => (
        <div className="max-line2" title={value}>
          {value}
        </div>
      ),
    },
    {
      title: "Trạng thái ",
      dataIndex: "ten_trang_thai",
      key: "ten_trang_thai",
      align: "left",
      width: 150,
      render: (text, record) => (
        <div className="d-flex justify-content-space-between align-items-center mh-36">
          <div
            className="max-line1"
            style={{ color: COLOR_STATUS_ORDER[record?.trang_thai] }}
          >
            {text}
          </div>
          <div className="list-button-hover">
            <Space size={12}>
              {setBtns(record?.list_btns, record).map(
                i =>
                  i?.enable && (
                    <ButtonCircle
                      title={i?.title}
                      iconName={i?.icon}
                      onClick={i.onClick}
                    />
                  ),
              )}
            </Space>
          </div>
        </div>
      ),
    },
  ]

  return (
    <OrderManagerStyle>
      <SpinCustom spinning={loading}>
        <Tabs
          activeKey={condition.status}
          onChange={key =>
            setCondition({
              ...condition,
              status: key,
            })
          }
          // type="card"
          // size={size}
          items={listStatus?.map(i => ({
            label: `${i?.ten_trang_thai} (${i?.so_luong_don_hang})`,
            key: i?.trang_thai,
          }))}
        />
        <div className="title-type-1 d-flex justify-content-space-between align-items-center pb-8 pt-0 mb-16">
          <div style={{ fontSize: 24 }}>Danh sách đơn hàng</div>
          <Button btnType="primary" className="btn-hover-shadow">
            Thêm nhân viên
          </Button>
        </div>
        <TableCustom
          isPrimary
          dataSource={listOrder}
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                setShowModalDetail(record)
              },
            }
          }}
          sticky={{ offsetHeader: -12 }}
          loading={loading}
          textEmpty="Không có đơn hàng nào!"
          pagination={{
            hideOnSinglePage: total <= 10,
            current: condition?.currentPage,
            pageSize: condition?.pageSize,
            responsive: true,
            total: total,
            locale: { items_per_page: "" },
            showSizeChanger: total > 10,
            onChange: (page, pageSize) => {
              let currentPage = page
              if (pageSize !== condition.pageSize) {
                currentPage = 1
              }
              setCondition({
                ...condition,
                currentPage: currentPage,
                pageSize: pageSize,
              })
            },
          }}
          rowKey="id"
          scroll={{ x: "800px" }}
        />
      </SpinCustom>
      {showModalDetail && (
        <ModalOrderDetail
          open={showModalDetail}
          onCancel={() => setShowModalDetail(false)}
          setBtns={() => setBtns(showModalDetail?.list_btns, showModalDetail)}
        />
      )}
      {!!openCancelOrder && (
        <CancelOrder
          open={openCancelOrder}
          onCancel={() => setOpenCancelOrder(false)}
          onOk={() => {
            getListOrder()
            getTotalStatus()
          }}
        />
      )}
      {!!openViewRate && (
        <ModalViewRate
          open={openViewRate}
          onCancel={() => setOpenViewRate(false)}
          onOk={() => {
            getListOrder()
            getTotalStatus()
          }}
        />
      )}
    </OrderManagerStyle>
  )
}

export default OrderManager
