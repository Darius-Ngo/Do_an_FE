import CustomModal from "src/components/Modal/CustomModal"
import InvoiceComponent from "./PrintBill"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import Button from "src/components/MyButton/Button"
import { Space, Spin } from "antd"
import { useState } from "react"
import OrderService from "src/services/OrderService"
import { useEffect } from "react"

const ModalPrint = ({ open, onCancel }) => {
  const [loading, setLoading] = useState(false)
  const [orderDetail, setOrderDetail] = useState({})
  const invoiceRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  })
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
  useEffect(() => {
    getDetail()
  }, [open])
  return (
    <CustomModal
      title={false}
      open={!!open}
      footer={
        <Space size={12}>
          <Button btnType="gray-style" onClick={onCancel}>
            Đóng
          </Button>
          <Button btnType="primary" onClick={handlePrint}>
            In phiếu
          </Button>
        </Space>
      }
      onCancel={onCancel}
      width={400}
    >
      <Spin spinning={loading}>
        <div className="w-100 d-flex justify-content-center">
          <InvoiceComponent ref={invoiceRef} data={orderDetail} />
        </div>
      </Spin>
    </CustomModal>
  )
}

export default ModalPrint
