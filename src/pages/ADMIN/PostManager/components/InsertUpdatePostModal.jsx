import {
  Col,
  DatePicker,
  Dropdown,
  Form,
  Image,
  Input,
  InputNumber,
  Menu,
  Row,
  Select,
  Tag,
  Upload,
} from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import FileResizer from "react-image-file-resizer"
import { useNavigate } from "react-router-dom"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import SvgIcon from "src/components/SvgIcon"
import TinyEditor from "src/components/TinyEditor"
import { STATUS_POST } from "src/constants/constants"
import ROUTER from "src/router"
import FileService from "src/services/FileService"
import PostService from "src/services/PostService"
import { ButtonUploadStyle, CreatePostStyled } from "../styled"
import dayjs from "dayjs"
import { normFile } from "src/lib/utils"
import TagService from "src/services/TagService"

const { TextArea } = Input
const InsertUpdatePostModal = ({ open, onCancel, onOk }) => {
  const [loading, setLoading] = useState(true)
  const [listTag, setListTag] = useState([])
  const [tag, setTag] = useState("")
  const [allTags, setAllTags] = useState([])
  const [form] = Form.useForm()
  const isEdit = open.isEdit

  console.log("listTag", listTag)

  const menu = (
    <div
      style={{
        maxHeight: "300px",
        overflow: "hidden auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "1px 1px 10px 1px #f0f0f0",
      }}
    >
      <Menu
        items={allTags?.map(i => ({
          key: i?.id,
          label: i?.ten_the,
          disabled: listTag?.find(j => i?.id === j?.id),
          onClick: () => setListTag(pre => [...pre, i]),
        }))}
      />
    </div>
  )
  const renderTag = () => {
    return (
      <Row gutter={[10, 10]} className="align-items-center">
        {listTag?.map((i, idx) => (
          <Col key={`create_post_tag${idx}`}>
            <Tag
              closable
              closeIcon={
                <SvgIcon
                  onClick={() =>
                    setListTag(prev =>
                      prev?.filter((_, index) => index !== idx),
                    )
                  }
                  name="close-tag"
                />
              }
            >
              {i?.ten_the}
            </Tag>
          </Col>
        ))}
        <Col flex="auto">
          <Input
            placeholder="Thêm thẻ"
            value={tag}
            className="input-tag-create-post"
            onChange={e => setTag(e?.target?.value)}
            onPressEnter={e => {
              e?.preventDefault()
              e?.stopPropagation()
              if (!e?.target?.value) return
              setListTag(pre => [...pre, { ten_the: e?.target?.value }])
              setTag("")
            }}
          />
        </Col>
      </Row>
    )
  }
  useEffect(() => {
    if (isEdit) getDetailPost()
  }, [open, isEdit])
  useEffect(() => {
    getListCombobox()
  }, [])

  const getListCombobox = async () => {
    try {
      setLoading(true)
      const resTags = await TagService.getListCombobox()
      if (!resTags?.isError) setAllTags(resTags?.Object)
    } finally {
      setLoading(false)
    }
  }

  const getDetailPost = async () => {
    try {
      setLoading(true)
      const res = await PostService.getDetailPost({ id_bai_viet: open.id })
      if (res?.isError) return
      form.setFieldsValue({
        ...res?.Object,
        anh_mo_ta: res?.Object?.anh_mo_ta
          ? [
              {
                url: res?.Object?.anh_mo_ta,
              },
            ]
          : [],
        ngay_dang: !!res?.Object?.ngay_dang
          ? dayjs(res?.Object?.ngay_dang)
          : null,
      })
      setListTag(res?.Object?.the_bv || [])
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      let urlImg = ""
      if (values?.anh_mo_ta?.length && values?.anh_mo_ta[0]?.originFileObj) {
        const formData = new FormData()
        values?.anh_mo_ta?.map(img =>
          formData.append("file", img?.originFileObj),
        )
        const resUpload = await FileService.uploadFile(formData)
        urlImg = `${process.env.REACT_APP_API_ROOT}${resUpload?.Object}`
      } else {
        if (!!values?.anh_mo_ta) urlImg = values?.anh_mo_ta[0]?.url
      }
      const res = await PostService[isEdit ? "updatePost" : "addPost"]({
        ...values,
        anh_mo_ta: urlImg,
        ngay_dang: !!values?.ngay_dang ? values?.ngay_dang?.format() : null,
        the_bv: listTag?.map(i => i?.id)?.toString(),
        id: open?.id,
      })
      if (res?.isError) return
      Notice({ msg: `${isEdit ? "Cập nhật" : "Thêm"} bài viết thành công!` })
      onOk()
      onCancel()
    } finally {
      setLoading(false)
    }
  }
  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end">
      <Button
        btnType="primary"
        disabled={loading}
        className="form-contact-submit"
        form="myForm"
        key="submit"
        htmlType="submit"
        onClick={() => onSubmit()}
      >
        Lưu lại
      </Button>
    </div>
  )
  return (
    <CustomModal
      title={!!isEdit ? "Cập nhật bài viết" : "Thêm bài viết"}
      footer={renderFooter()}
      width={"90%"}
      open={!!open}
      onCancel={onCancel}
    >
      <Form
        layout="vertical"
        form={form}
        name="insertTop"
        id="myForm"
        initialValues={{
          ngay_dang: dayjs(),
          thu_tu: 0,
          trang_thai: 1,
          binh_luan_bv: 1,
        }}
        scrollToFirstError={{
          behavior: "smooth",
          block: "start",
          inline: "start",
        }}
      >
        <CreatePostStyled>
          <SpinCustom spinning={loading}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Tiêu đề"
                  name="tieu_de"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tiêu đề" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Tóm tắt"
                  name="tom_tat"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                >
                  <TextArea
                    placeholder="Nhập nội dung"
                    style={{ height: 115, overflow: "hidden auto" }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Ngày đăng"
                  name="ngay_dang"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                >
                  <DatePicker placeholder="Chọn" format="DD/MM/YYYY" />
                </Form.Item>
              </Col>
              <Col span={6}>
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
                    {STATUS_POST?.map(i => (
                      <Select.Option key={+i.value} value={+i.value}>
                        {i?.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Thứ tự"
                  name="thu_tu"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                >
                  <InputNumber placeholder="Nhập" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="binh_luan_bv"
                  label="Bình luận"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                >
                  <Select placeholder="Chọn">
                    <Select.Option value={1}>Mở bình luận</Select.Option>
                    <Select.Option value={0}>Khóa bình luận</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12} id="tag-drop">
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  getPopupContainer={() => document.getElementById("tag-drop")}
                >
                  <Form.Item
                    label="Tags phổ biến"
                    className="create-post-add-tag"
                  >
                    <Input prefix={renderTag()} disabled />
                  </Form.Item>
                </Dropdown>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Hình thu nhỏ"
                  name="anh_mo_ta"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  required
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
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
              <Col span={24}>
                <Form.Item
                  label="Nội dung bài viết"
                  required
                  name="noi_dung"
                  trigger="onEditorChange"
                  validateTrigger={["onEditorChange"]}
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                >
                  <TinyEditor setLoading={setLoading} />
                </Form.Item>
              </Col>
            </Row>
          </SpinCustom>
        </CreatePostStyled>
      </Form>
    </CustomModal>
  )
}

export default InsertUpdatePostModal
