import { Col, DatePicker, Form, Input, Row, Select, Upload } from "antd"
import { useEffect, useMemo, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import SvgIcon from "src/components/SvgIcon"
import { GENDER_LIST, ROLE_ID, STATUS_ACTIVE } from "src/constants/constants"
import {
  getRegexEmail,
  getRegexPassword,
  getRegexPhoneNumber,
  getRegexUsername,
} from "src/lib/stringsUtils"
import { normFile } from "src/lib/utils"
import FileService from "src/services/FileService"

import dayjs from "dayjs"
import SelectAddress from "src/components/SelectAddress"
import AccountService from "src/services/AccountService"
import styled from "styled-components"
import { ButtonUploadStyle } from "../styled"
const { Option } = Select
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
        avatar: open.avatar
          ? [
              {
                url: open.avatar,
              },
            ]
          : [],
        ngay_sinh: !!open.ngay_sinh ? dayjs(open.ngay_sinh) : null,
      })
    } else {
      form.resetFields()
      form.setFieldsValue({
        password: process.env.REACT_APP_DEFAULT_PASSWORD,
      })
    }
  }, [open])

  const handleSave = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      let urlAvatar = ""
      if (values?.avatar?.length && values?.avatar[0]?.originFileObj) {
        const formData = new FormData()
        values?.avatar?.map(img => formData.append("file", img?.originFileObj))
        const resUpload = await FileService.uploadFile(formData)
        urlAvatar = `${process.env.REACT_APP_API_ROOT}${resUpload?.Object}`
      } else {
        if (!!values?.avatar) urlAvatar = values?.avatar[0]?.url
      }
      const res = await AccountService[isUpdate ? "updateUser" : "addUser"]({
        ...values,
        avatar: urlAvatar,
        ngay_sinh: values.ngay_sinh
          ? values.ngay_sinh.format("YYYY-MM-DD")
          : null,
        id_phan_quyen: ROLE_ID.KHACH_HANG,
        id: open.id,
      })
      if (res?.isError) return
      onOk && onOk()
      Notice({
        msg: `${isUpdate ? "Cập nhật" : "Thêm mới"} người dùng thành công!`,
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
      title={!!isUpdate ? "Cập nhật người dùng" : "Thêm người dùng"}
      footer={renderFooter()}
      width={1024}
      open={open}
      onCancel={onCancel}
    >
      <SpinCustom spinning={loading}>
        <Styled>
          <Form form={form} layout="vertical">
            <Row gutter={[16]}>
              <Col span={24}>
                <Form.Item
                  label="Hình đại diện"
                  name="avatar"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[
                    () => ({
                      validator(_, value) {
                        if (!!value?.find(i => i?.size > 5 * 1024 * 1024)) {
                          return Promise.reject(
                            new Error("Dung lượng file tối đa 5MB"),
                          )
                        }
                        return Promise.resolve()
                      },
                    }),
                  ]}
                >
                  <Upload
                    accept="image/*"
                    multiple={false}
                    maxCount={1}
                    beforeUpload={() => false}
                    listType="picture-card"
                  >
                    <Row className="align-items-center">
                      <ButtonUploadStyle>
                        <Button className="account-button-upload ">
                          <Row className="account-background-upload d-flex align-items-center">
                            <SvgIcon name="add-media-video" />
                            <div className="account-text-upload ml-16">
                              Chọn ảnh
                            </div>
                          </Row>
                        </Button>
                      </ButtonUploadStyle>
                      <div className="sub-color fs-12 ml-16">
                        Dung lượng file tối đa 5MB, định dạng: .JPG, .JPEG,
                        .PNG, .SVG
                      </div>
                    </Row>
                  </Upload>
                </Form.Item>
              </Col>
              <Col md={open?.UserID ? 6 : 12} xs={24}>
                <Form.Item
                  label="Tên tài khoản"
                  required
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
                  <Input placeholder="Nhập tên" disabled={!!isUpdate} />
                </Form.Item>
              </Col>
              {isUpdate ? (
                <Col md={12} xs={24}>
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
              ) : (
                <Col md={12} xs={24}>
                  <Form.Item
                    label="Mật khẩu"
                    required
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
                    <Input.Password placeholder="Nhập" />
                  </Form.Item>
                </Col>
              )}
              <Col md={12} xs={24}>
                <Form.Item
                  label="Họ và tên"
                  required
                  name="ho_ten"
                  rules={[
                    {
                      required: true,
                      message: "Họ và tên không được để trống",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên" />
                </Form.Item>
              </Col>
              <Col md={6} xs={24}>
                <Form.Item label="Giới tính" name="gioi_tinh">
                  <Select placeholder="Chọn" allowClear>
                    {GENDER_LIST?.map(i => (
                      <Option key={+i?.value} value={+i?.value}>
                        {i?.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={6} xs={24}>
                <Form.Item label="Ngày sinh" name="ngay_sinh">
                  <DatePicker
                    placeholder="Chọn"
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
                  label="Số điện thoại"
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
                  <Input placeholder="Nhập" />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  label="Email"
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
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <SelectAddress
                  floating={false}
                  form={form}
                  required={false}
                  setLoading={setLoading}
                  listFormName={["id_tp", "id_qh", "id_xp"]}
                  initValue={useMemo(
                    () => ({
                      id_tp: open?.id_tp,
                      id_qh: open?.id_qh,
                      id_xp: open?.id_xp,
                    }),
                    [],
                  )}
                />
              </Col>
              <Col span={24}>
                <Form.Item label="Địa chỉ chi tiết" name="thon_xom">
                  <Input placeholder="Số nhà, thôn xóm,..." />
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
