import { Space, Tabs } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CB1 from "src/components/Modal/CB1"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import TableCustom from "src/components/Table/CustomTable"
import {
  MainTableData,
  MainTableHeader,
  SubTableData,
  SubTableHeader,
} from "src/components/Table/CustomTable/styled"
import { COLOR_STATUS_ORDER, PAYMENT_TYPE } from "src/constants/constants"
import ModalViewRate from "src/pages/USER/ListOrdered/components/ModalViewRate"
import OrderService from "src/services/OrderService"
import { formatMoneyVND } from "./../../../lib/utils"
import CancelOrder from "./components/CancelOrder"
import ModalOrderDetail from "./components/ModalOrderDetail"
import ModalViewImg from "./components/ModalViewImg"
import { OrderManagerStyle } from "./styled"
import ModalPrint from "./components/ModalPrint"
import FlInput from "src/components/FloatingLabel/Input"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"

const OrderManager = () => {
  const { userInfo } = useSelector(state => state.appGlobal)
  const [loading, setLoading] = useState(false)
  const [showModalDetail, setShowModalDetail] = useState(false)
  const [listOrder, setListOrder] = useState([])
  const [total, setTotal] = useState(0)
  const [listStatus, setListStatus] = useState([])
  const [openCancelOrder, setOpenCancelOrder] = useState(false)
  const [openViewRate, setOpenViewRate] = useState(false)
  const [listImg, setListImg] = useState(false)
  const [print, setPrint] = useState(false)

  const [condition, setCondition] = useState({
    pageSize: 10,
    currentPage: 1,
    status: 0,
    textSearch: "",
    fromDate: null,
    toDate: null,
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
      enable: true,
      title: "In phiếu bán hàng",
      icon: "print",
      btnType: "primary",
      onClick: () => {
        setPrint(data)
      },
    },
    {
      enable: item?.giao_hang,
      title: "Đang giao",
      icon: "shipping",
      btnType: "primary",
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
      btnType: "primary",
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
      btnType: "primary",
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
      btnType: "red-style",
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
      btnType: "third",
      onClick: () => setOpenViewRate(data),
    },
    {
      enable: !!data?.chung_tu_tt,
      title: "Chứng từ thanh toán",
      icon: "receipt-icon",
      btnType: "third",
      onClick: () =>
        setListImg({
          ...data,
          chung_tu_tt: data.chung_tu_tt.split(","),
        }),
    },
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
      title: (
        <>
          <MainTableHeader>Mã đơn hàng</MainTableHeader>
          <SubTableHeader>Thời gian đặt</SubTableHeader>
        </>
      ),
      dataIndex: "ma_don_hang",
      key: "ma_don_hang",
      align: "left",
      width: 160,
      render: (val, record) => (
        <>
          <MainTableData>{val}</MainTableData>
          <SubTableData>
            {dayjs(record?.thoi_gian_dat).format("HH:MM DD/MM/YYYY")}
          </SubTableData>
        </>
      ),
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
      title: (
        <>
          <MainTableHeader>Đơn giá (VNĐ)</MainTableHeader>
          <SubTableHeader>SĐT nhận hàng</SubTableHeader>
        </>
      ),
      dataIndex: "tong_tien",
      key: "tong_tien",
      align: "left",
      width: 200,
      render: (value, record) => (
        <>
          <MainTableData>{formatMoneyVND(value)}</MainTableData>
          <SubTableData>{PAYMENT_TYPE[record?.kieu_thanh_toan]}</SubTableData>
        </>
      ),
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
          <Space size={12} className="fw-500">
            <FlInput
              search
              style={{ width: 500 }}
              label="Nhập Mã đơn hàng, Tên, số điện thoại người nhận"
              onSearch={textSearch =>
                setCondition(pre => ({ ...pre, textSearch }))
              }
            />
            <FlDatePicker
              ranger
              label={["Từ ngày", "Đến ngày"]}
              value={
                condition?.fromDate
                  ? [
                      condition?.fromDate ? dayjs(condition?.fromDate) : null,
                      condition?.toDate ? dayjs(condition?.toDate) : null,
                    ]
                  : []
              }
              onChange={date =>
                setCondition(pre => ({
                  ...pre,
                  fromDate: date ? date[0]?.format() : null,
                  toDate: date ? date[1]?.format() : null,
                }))
              }
            />
          </Space>
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
      {listImg && (
        <ModalViewImg open={listImg} onCancel={() => setListImg(false)} />
      )}
      {print && <ModalPrint open={print} onCancel={() => setPrint(false)} />}
    </OrderManagerStyle>
  )
}

export default OrderManager
