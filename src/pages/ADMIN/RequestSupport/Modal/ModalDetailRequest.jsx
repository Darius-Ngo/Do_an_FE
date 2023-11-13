import { Col, Form, Input, Row } from "antd"
import { useEffect, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import RequestSupportService from "src/services/RequestSupportService"
import { StyleModalDetailRequest } from "../styled"
import InforRequest from "./InforRequest"
import { useSelector } from "react-redux"

const ModalDetailRequest = ({ open, onCancel, onOk }) => {
  const { userInfo } = useSelector(state => state.appGlobal)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      phan_hoi: open?.phan_hoi,
      van_de_ht: open?.van_de_ht,
    })
  }, [open])

  const handleSubmit = async staus => {
    const value = await form.validateFields()
    setLoading(true)
    const body = {
      id: open?.id,
      trang_thai: staus,
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
  const handleUpdate = async () => {
    const values = await form.validateFields()
    setLoading(true)
    const body = {
      id: open?.id,
      id_nguoi_ht: userInfo?.id,
      phan_hoi: values?.phan_hoi,
    }
    RequestSupportService.updateRequest(body)
      .then(res => {
        if (res.isError) return
        Notice({ msg: "Cập nhật thành công." })
        onCancel()
        onOk()
      })
      .finally(() => setLoading(false))
  }

  const renderFooter = () => {
    return (
      <div className="d-flex justify-content-flex-end">
        <Button btnType="gray-style" onClick={onCancel}>
          Đóng
        </Button>
        {!!open?.list_btns?.xac_nhan && (
          <Button
            loading={loading}
            btnType="primary"
            className="btn-hover-shadow"
            onClick={() => handleSubmit(2)}
          >
            Xác nhận hỗ trợ
          </Button>
        )}
        {!!open?.list_btns?.tu_choi && (
          <Button
            loading={loading}
            style={{ marginLeft: "8px" }}
            className="btn-hover-shadow"
            btnType="red-style"
            onClick={() => handleSubmit(3)}
          >
            Từ chối hỗ trợ
          </Button>
        )}
        {!!open?.list_btns?.thu_hoi && (
          <>
            <Button
              loading={loading}
              style={{ marginLeft: "8px" }}
              className="btn-hover-shadow"
              btnType="primary"
              onClick={() => {
                handleUpdate()
              }}
            >
              Ghi lại
            </Button>
            {/* <Button
                    loading={loading}
                    style={{ marginLeft: "8px" }}
                    className="btn-hover-shadow"
                    btnType="primary"
                    onClick={() => {
                      handleSubmit(4)
                    }}
                  >
                    Thu hồi
                  </Button> */}
          </>
        )}
      </div>
    )
  }
  return (
    <CustomModal
      open={!!open}
      onCancel={onCancel}
      width={1024}
      title={`Chi tiết phiếu yêu cầu hỗ trợ`}
      footer={renderFooter()}
    >
      <StyleModalDetailRequest>
        <SpinCustom spinning={loading}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <InforRequest detailContact={open} />
            </Col>
            <Col span={24}>
              <Form form={form} layout="vertical">
                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="Nội dung cần hỗ trợ:"
                      name="van_de_ht"
                      style={{ width: "95%" }}
                    >
                      <Input.TextArea
                        disabled
                        style={{ overflow: "auto" }}
                        placeholder="Nhập nội dung"
                        rows={5}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Nội dung hỗ trợ/Từ chối"
                      name="phan_hoi"
                      rules={[
                        {
                          required: true,
                          message: "Thông tin không được để trống!",
                        },
                      ]}
                    >
                      <Input.TextArea
                        style={{ overflow: "auto" }}
                        placeholder="Nhập nội dung"
                        rows={5}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </SpinCustom>
      </StyleModalDetailRequest>
    </CustomModal>
  )
}

export default ModalDetailRequest
