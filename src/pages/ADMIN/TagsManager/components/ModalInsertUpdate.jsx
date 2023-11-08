import { Col, Form, Input, Row, Select } from "antd"
import { useEffect, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import { STATUS_ACTIVE } from "src/constants/constants"
import TagService from "src/services/TagService"
import styled from "styled-components"
const Styled = styled.div`
  .ant-upload.ant-upload-select-picture-card {
    width: unset;
    height: unset;
    background-color: unset;
    border: unset;
  }
  .ant-upload-list {
    align-items: center;
    display: flex;
  }
`
const ModalInsertUpdate = ({ onOk, open, onCancel }) => {
  const isUpdate = open.isUpdate
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isUpdate) {
      form.setFieldsValue({
        ...open,
      })
    } else {
      form.resetFields()
    }
  }, [open])

  const handleSave = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await TagService[isUpdate ? "updateTags" : "addTags"]({
        ...values,
        id: open.id,
      })
      if (res?.isError) return
      onOk && onOk()
      Notice({
        msg: `${isUpdate ? "Cập nhật" : "Thêm mới"} thẻ thành công!`,
      })
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end">
      <Button btnType="third" onClick={onCancel}>
        Đóng
      </Button>
      <Button
        btnType="primary"
        className="btn-hover-shadow"
        onClick={handleSave}
      >
        Lưu lại
      </Button>
    </div>
  )
  return (
    <CustomModal
      title={!!isUpdate ? "Cập nhật thẻ" : "Thêm thẻ"}
      footer={renderFooter()}
      width={700}
      open={open}
      onCancel={onCancel}
    >
      <SpinCustom spinning={loading}>
        <Styled>
          <Form form={form} layout="vertical">
            <Row gutter={[16]}>
              <Col md={24} xs={24}>
                <Form.Item
                  label="Mã thẻ"
                  required
                  name="ma_the"
                  rules={[
                    {
                      required: true,
                      message: "Tên thẻ không được để trống",
                    },
                  ]}
                >
                  <Input placeholder="Nhập mã" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  label="Tên thẻ"
                  required
                  name="ten_the"
                  rules={[
                    {
                      required: true,
                      message: "Tên thẻ không được để trống",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên" />
                </Form.Item>
              </Col>
              {isUpdate && (
                <Col md={24} xs={24}>
                  <Form.Item
                    label="Trạng thái"
                    name="trang_thai"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống",
                      },
                    ]}
                  >
                    <Select placeholder="Chọn trạng thái">
                      {STATUS_ACTIVE.map(i => (
                        <Select.Option key={+i.value} value={+i.value}>
                          {i?.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              )}
              <Col md={24} xs={24}>
                <Form.Item label="Ghi chú" name="ghi_chu">
                  <Input.TextArea placeholder="Nhập" rows={4} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Styled>
      </SpinCustom>
    </CustomModal>
  )
}

export default ModalInsertUpdate
