import dayjs from "dayjs"
import { useEffect, useState } from "react"
import SpinCustom from "src/components/Spin"
import TableCustom from "src/components/Table/CustomTable"
import {
  MainTableData,
  MainTableHeader,
  SubTableData,
  SubTableHeader,
} from "src/components/Table/CustomTable/styled"
import { PAYMENT_TYPE } from "src/constants/constants"
import OrderService from "src/services/OrderService"
import { formatMoneyVND } from "src/lib/utils"
import ModalOrderDetail from "../../OrderManager/components/ModalOrderDetail"

const ListOrder = ({ date, totalMoneyOrder }) => {
  const [loading, setLoading] = useState(false)
  const [showModalDetail, setShowModalDetail] = useState(false)
  const [listOrder, setListOrder] = useState([])
  const [total, setTotal] = useState(0)

  const [condition, setCondition] = useState({
    pageSize: 10,
    currentPage: 1,
    status: 4,
    textSearch: "",
  })

  const getListOrder = async () => {
    try {
      setLoading(true)
      const res = await OrderService.getListOrderManager({
        ...condition,
        ...date,
      })
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
    getListOrder()
  }, [condition, date])

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
  ]

  return (
    <SpinCustom spinning={loading}>
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
        title={() => (
          <div className="fw-600 text-uppercase">
            Doanh số đã bán: {formatMoneyVND(+totalMoneyOrder)}
          </div>
        )}
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
      {showModalDetail && (
        <ModalOrderDetail
          open={showModalDetail}
          onCancel={() => setShowModalDetail(false)}
          setBtns={() => []}
        />
      )}
    </SpinCustom>
  )
}

export default ListOrder
