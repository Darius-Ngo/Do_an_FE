import { Col, Form, Input, Row, Select, Upload } from "antd"
import { useEffect, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import SvgIcon from "src/components/SvgIcon"
import { STATUS_ACTIVE } from "src/constants/constants"
import { normFile } from "src/lib/utils"
import FileService from "src/services/FileService"

import dayjs from "dayjs"
import CategoryService from "src/services/CategoryService"
import styled from "styled-components"
import { ButtonUploadStyle } from "../../EmployeeManager/styled"
import TinyEditor from "src/components/TinyEditor"
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isUpdate) {
      form.setFieldsValue({
        ...open,
        anh: open.anh
          ? [
              {
                url: open.anh,
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
      if (values?.anh?.length && values?.anh[0]?.originFileObj) {
        const formData = new FormData()
        values?.anh?.map(img => formData.append("file", img?.originFileObj))
        const resUpload = await FileService.uploadFile(formData)
        urlAvatar = `${process.env.REACT_APP_API_ROOT}${resUpload?.Object}`
      } else {
        if (!!values?.anh) urlAvatar = values?.anh[0]?.url
      }
      const res = await CategoryService[
        isUpdate ? "updateCategory" : "addCategory"
      ]({
        ...values,
        anh: urlAvatar,
        id: open.id,
      })
      if (res?.isError) return
      onOk && onOk()
      Notice({
        msg: `${isUpdate ? "Cập nhật" : "Thêm mới"} danh mục thành công!`,
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
      title={!!isUpdate ? "Cập nhật danh mục" : "Thêm danh mục"}
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
                  label="Ảnh mô tả"
                  name="anh"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[
                    {
                      required: true,
                      message: "Ảnh danh mục không được để trống",
                    },
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
              <Col md={24} xs={24}>
                <Form.Item
                  label="Tên danh mục"
                  required
                  name="ten_loai_san_pham"
                  rules={[
                    {
                      required: true,
                      message: "Tên danh mục không được để trống",
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
                <Form.Item
                  label="Mô tả cho danh mục"
                  name="mo_ta"
                  required
                  trigger="onEditorChange"
                  validateTrigger={["onEditorChange"]}
                  rules={[
                    {
                      required: true,
                      message: `Nhập lý do ${open?.titleModal}`,
                    },
                  ]}
                >
                  <TinyEditor setLoading={setLoading} />
                </Form.Item>
              </Col>
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
