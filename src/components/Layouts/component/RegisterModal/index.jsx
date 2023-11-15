import { Col, Form, Row, Select, Spin } from "antd"
import dayjs from "dayjs"
import { useState } from "react"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SelectAddress from "src/components/SelectAddress"
import { GENDER_LIST } from "src/constants/constants"
import {
  getRegexEmail,
  getRegexPassword,
  getRegexPhoneNumber,
  getRegexUsername,
} from "src/lib/stringsUtils"
import AuthService from "src/services/AuthService"
import styled from "styled-components"
import { ModalLoginStyle, StyleLoginModal } from "../LoginModal/styled"

const ModalStyle = styled.div`
  .ant-input-search-button,
  .ant-btn-primary:not(:disabled):hover {
    color: #fff;
    background-color: #52c41a;
    display: flex;
    align-items: center;
    span {
      transform: translateY(-2px);
    }
  }
`

const RegisterModal = ({ open, handleCancel, handleLogin, handleOk }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await AuthService.register({
        ...values,
        ngay_sinh: values.ngay_sinh ? values.ngay_sinh.format() : undefined,
      })
      if (res?.isError) return
      Notice({
        msg: "Đăng ký tài khoản thành công!",
      })
      handleLogin()
      handleCancel()
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalLoginStyle
      title={false}
      width={800}
      footer={null}
      open={open}
      onCancel={handleCancel}
    >
      <ModalStyle>
        <Spin spinning={loading}>
          <Row>
            <Col span={24}>
              <StyleLoginModal>
                <div className="text-center mb-30">
                  <div className="fs-24 fw-600">Đăng ký tài khoản</div>
                </div>
                <div>
                  <Form form={form} layout="vertical">
                    <Row gutter={16}>
                      <Col md={12} xs={24}>
                        <Form.Item
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: "Tên tài khoản không được để trống",
                            },
                            {
                              pattern: getRegexUsername(),
                              message:
                                "Tài khoản phải nhiều hơn 6 kí tự, bao gồm chữ số hoặc chữ cái hoặc kí tự _ và không chứa khoảng trắng",
                            },
                          ]}
                        >
                          <FlInput label="Tên tài khoản" isRequired />
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={24}>
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Mật khẩu không được để trống",
                            },
                            {
                              pattern: getRegexPassword(),
                              message:
                                "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
                            },
                          ]}
                        >
                          <FlInput isPass label="Mật khẩu" isRequired />
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={24}>
                        <Form.Item
                          name="ho_ten"
                          rules={[
                            {
                              required: true,
                              message: "Họ và tên không được để trống",
                            },
                          ]}
                        >
                          <FlInput label="Họ và tên" isRequired />
                        </Form.Item>
                      </Col>
                      <Col md={6} xs={24}>
                        <Form.Item name="gioi_tinh">
                          <FlSelect label="Giới tính" allowClear>
                            {GENDER_LIST?.map(i => (
                              <Select.Option key={+i?.value} value={+i?.value}>
                                {i?.label}
                              </Select.Option>
                            ))}
                          </FlSelect>
                        </Form.Item>
                      </Col>
                      <Col md={6} xs={24}>
                        <Form.Item name="ngay_sinh">
                          <FlDatePicker
                            label="Ngày sinh"
                            format="DD/MM/YYYY"
                            allowClear
                            disabledDate={current =>
                              current && current >= dayjs().startOf("day")
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={24}>
                        <Form.Item
                          name="sdt"
                          rules={[
                            {
                              required: true,
                              message: "Số điện thoại không được để trống",
                            },
                            {
                              pattern: getRegexPhoneNumber(),
                              message: "Số điện thoại sai định dạng",
                            },
                          ]}
                        >
                          <FlInput label="Số điện thoại" isRequired />
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={24}>
                        <Form.Item
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Email không được để trống",
                            },
                            {
                              pattern: getRegexEmail(),
                              message: "Email sai định dạng",
                            },
                          ]}
                        >
                          <FlInput label="Email" isRequired />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <SelectAddress
                          floating={true}
                          form={form}
                          required={false}
                          setLoading={setLoading}
                          listFormName={["id_tp", "id_qh", "id_xp"]}
                        />
                      </Col>
                      <Col span={24}>
                        <Form.Item name="thon_xom">
                          <FlInput label="Địa chỉ chi tiết" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Button
                        loading={loading}
                        btnType="orange"
                        className="btn-login"
                        onClick={handleSubmit}
                      >
                        Đăng ký
                      </Button>
                    </Row>
                  </Form>
                  <div className="mt-12 fs-16">
                    Đã có tài khoản{" "}
                    <i
                      className="pointer"
                      style={{ color: "rgb(36 118 226)" }}
                      onClick={() => {
                        handleCancel()
                        handleLogin()
                      }}
                    >
                      Đăng nhập
                    </i>{" "}
                    ngay.
                  </div>
                </div>
              </StyleLoginModal>
            </Col>
          </Row>
        </Spin>
      </ModalStyle>
    </ModalLoginStyle>
  )
}

export default RegisterModal
