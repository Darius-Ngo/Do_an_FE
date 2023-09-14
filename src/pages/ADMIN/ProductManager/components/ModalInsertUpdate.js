import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
} from "antd"
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
import ProductService from "src/services/ProductService"
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
const ModalInsertUpdate = ({ onOk, open, onCancel, listCategory }) => {
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
        ngay_bd: !!open.ngay_bd ? dayjs(open.ngay_bd) : null,
        ngay_kt: !!open.ngay_kt ? dayjs(open.ngay_kt) : null,
      })
    } else {
      form.resetFields()
      form.setFieldsValue({
        password: process.env.REACT_APP_DEFAULT_PASSWORD,
        ...open,
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
        const resUpload = await FileService.uploadFileImage(formData)
        urlAvatar = `${process.env.REACT_APP_API_ROOT}${resUpload?.Object}`
      } else {
        if (!!values?.anh) urlAvatar = values?.anh[0]?.url
      }
      const res = await ProductService[
        isUpdate ? "updateProduct" : "addProduct"
      ]({
        ...values,
        anh: urlAvatar,
        id: open.id,
        // id_loai_san_pham: open.id_loai_san_pham,
        ngay_bd: values?.ngay_bd ? values?.ngay_bd.format() : null,
        ngay_kt: values?.ngay_kt ? values?.ngay_kt.format() : null,
      })
      if (res?.isError) return
      onOk && onOk()
      Notice({
        msg: `${isUpdate ? "Cập nhật" : "Thêm mới"} sản phẩm thành công!`,
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
      title={!!isUpdate ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
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
                      message: "Ảnh sản phẩm không được để trống",
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
                  label="Tên sản phẩm"
                  required
                  name="ten_san_pham"
                  rules={[
                    {
                      required: true,
                      message: "Tên sản phẩm không được để trống",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên" />
                </Form.Item>
              </Col>
              {isUpdate && (
                <Col md={12} xs={24}>
                  <Form.Item
                    label="Trạng thái"
                    name="trang_thai_sp"
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
              <Col md={isUpdate ? 12 : 24} xs={24}>
                <Form.Item
                  label="Danh mục cha"
                  name="id_loai_san_pham"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                >
                  <Select placeholder="Chọn danh mục cha">
                    {listCategory.map(i => (
                      <Select.Option key={i.id} value={i.id}>
                        {i?.ten_loai_san_pham}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item
                  label="Giá Size S"
                  required
                  name="gia_ban_sizes"
                  rules={[
                    {
                      required: true,
                      message: "Giá Size S không được để trống",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Nhập giá"
                    min={0}
                    formatter={value =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={value => value.replace(/\$\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item
                  label="Giá Size M"
                  required
                  name="gia_ban_sizem"
                  rules={[
                    {
                      required: true,
                      message: "Giá Size M không được để trống",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Nhập giá"
                    min={0}
                    formatter={value =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={value => value.replace(/\$\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item
                  label="Giá Size L"
                  required
                  name="gia_ban_sizel"
                  rules={[
                    {
                      required: true,
                      message: "Giá Size L không được để trống",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Nhập giá"
                    min={0}
                    formatter={value =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={value => value.replace(/\$\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item label="Giảm giá (%)" name="giam_gia">
                  <InputNumber
                    placeholder="Nhập % giảm giá"
                    min={0}
                    max={100}
                  />
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item label="Ngày bắt đầu khuyến mãi" name="ngay_bd">
                  <DatePicker
                    placeholder="Chọn"
                    format="DD/MM/YYYY"
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item label="Ngày kết thúc khuyến mãi" name="ngay_kt">
                  <DatePicker
                    placeholder="Chọn"
                    format="DD/MM/YYYY"
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item label="Thành phần sản phẩm" name="ghi_chu">
                  <Input.TextArea placeholder="Nhập" rows={4} />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  label="Mô tả cho sản phẩm"
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
            </Row>
          </Form>
        </Styled>
      </SpinCustom>
    </CustomModal>
  )
}

export default ModalInsertUpdate
