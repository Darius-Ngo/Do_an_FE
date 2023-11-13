import { Form, Input, Spin } from "antd"
import { useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import RequestSupportService from "src/services/RequestSupportService"
import { StyleModalConfirm } from "../styled"
import { useSelector } from "react-redux"

const ModalConfirm = ({ open, onCancel, onOk, selectedRow }) => {
  const { userInfo } = useSelector(state => state.appGlobal)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async () => {
    const value = await form.validateFields()
    setLoading(true)
    const body = {
      id: open?.id,
      trang_thai: open?.type,
      email: open?.email,
      id_nguoi_ht: userInfo?.id,
      ...value,
    }
    RequestSupportService.updateStatus(body)
      .then(res => {
        if (res.isError) return
        Notice({ msg: "Cập nhật thành công." })
        onCancel()
        onOk()
      })
      .finally(() => setLoading(false))
  }

  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end">
      <Button loading={loading} btnType="gray-style" onClick={onCancel}>
        Đóng
      </Button>
      <Button
        loading={loading}
        btnType="primary"
        onClick={() => handleSubmit(open?.type)}
      >
        {open?.type === 3 ? "Từ chối hỗ trợ" : "Xác nhận hỗ trợ"}
      </Button>
    </div>
  )
  return (
    <CustomModal
      title={open?.type === 3 ? "Từ chối hỗ trợ" : "Xác nhận hỗ trợ"}
      open={!!open}
      width="1000px"
      onCancel={onCancel}
      footer={renderFooter()}
    >
      <Spin spinning={loading}>
        <StyleModalConfirm>
          <Form form={form} layout="vertical">
            <Form.Item
              label={open?.type === 3 ? "Lý do từ chối" : "Nội dung hỗ trợ"}
              name={"phan_hoi"}
              rules={[
                {
                  required: true,
                  message: "Thông tin không được để trống!",
                },
              ]}
              className="mb-0"
            >
              <Input.TextArea
                placeholder={open?.type === 3 ? "Nhập lý do" : "Nhập nội dung"}
                rows={5}
              />
            </Form.Item>
          </Form>
        </StyleModalConfirm>
      </Spin>
    </CustomModal>
  )
}

export default ModalConfirm
