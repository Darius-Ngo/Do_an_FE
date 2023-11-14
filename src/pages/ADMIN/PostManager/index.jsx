import { Col, Form, InputNumber, Row, Select, Tooltip } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { FloatActionWrapper } from "src/components/FloatAction/styles"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import { STATUS_POST, STATUS_POST_COLOR } from "src/constants/constants"
import PostService from "src/services/PostService"
import InsertUpdatePostModal from "./components/InsertUpdatePostModal"
import { PostManagerStyled } from "./styled"
import FlSelect from "src/components/FloatingLabel/Select"
import FlInput from "src/components/FloatingLabel/Input"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import ViewPost from "./components/ViewPost"

const PostManager = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [openInsertUpdatePostModal, setOpenInsertUpdatePostModal] =
    useState(false)
  const [openView, setOpenView] = useState(false)
  const [total, setTotal] = useState()
  const [rowSelected, setRowSelected] = useState([])
  const [listPost, setListPost] = useState([])
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 20,
    status: 1,
  })

  const [textSearch, setTextSearch] = useState("")
  const columns = [
    {
      title: "Tiêu đề bài viết",
      dataIndex: "tieu_de",
      key: "tieu_de",
      align: "left",
      render: (val, record, idx) => (
        <Tooltip title={val} mouseLeaveDelay={0}>
          <div className="max-line2">{val}</div>
        </Tooltip>
      ),
    },
    {
      title: "Thứ tự",
      dataIndex: "thu_tu",
      key: "thu_tu",
      align: "center",
      width: 100,
      render: (text, record) => (
        <div
          className="d-flex-center"
          style={{ height: "100%" }}
          onClick={e => {
            e?.stopPropagation()
          }}
        >
          <Form.Item name={record?.id} className="m-0">
            <InputNumber
              defaultValue={text}
              className="input-border-bottom-only"
            />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Lượt xem",
      dataIndex: "luot_xem",
      key: "luot_xem",
      align: "center",
      width: 100,
    },
    {
      title: "Ngày đăng",
      dataIndex: "ngay_dang",
      key: "ngay_dang",
      align: "left",
      width: 140,
      render: text => text && moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Tóm tắt",
      dataIndex: "tom_tat",
      key: "tom_tat",
      align: "left",
      render: (val, record, idx) => (
        <Tooltip title={val} mouseLeaveDelay={0}>
          <div className="max-line2">{val}</div>
        </Tooltip>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
      align: "left",
      width: 140,
      render: (text, record) => {
        const status = STATUS_POST?.find(i => i?.value === text)
        return (
          <div className="d-flex justify-content-space-between w-100 align-items-center mh-36">
            <div
              className="text-ellipsis text-center w-100 fw-600"
              style={{ color: STATUS_POST_COLOR[text] }}
            >
              {status?.label}
            </div>
            <FloatActionWrapper size="small" className="float-action__wrapper">
              {setBtn(record)?.map(
                i =>
                  i.enable && (
                    <ButtonCircle
                      title={i?.title}
                      iconName={i?.icon}
                      onClick={i.onClick}
                    />
                  ),
              )}
            </FloatActionWrapper>
          </div>
        )
      },
    },
  ]

  const setBtn = record => [
    {
      enable: true,
      title: "Sửa",
      icon: "edit-green",
      btnType: "primary",
      onClick: () => {
        setOpenInsertUpdatePostModal({
          ...record,
          isEdit: true,
        })
      },
    },
    {
      enable: true,
      title: "Xoá",
      icon: "delete-red-row",
      btnType: "red-style",
      onClick: () =>
        CB1({
          title: ` Bạn có chắc chắn muốn xoá bài viết
        <strong> ${record?.tieu_de}</strong> không?`,
          icon: "trashRed",
          okText: "Đồng ý",
          onOk: async close => {
            deletePost(record?.id)
            close()
          },
        }),
    },
    {
      enable: true,
      title: record.trang_thai === 1 ? "Khóa bài viết" : "Mở khóa",
      icon: record.trang_thai === 1 ? "lock" : "unlock",
      btnType: "third",
      onClick: () =>
        CB1({
          title: `Bạn có chắc chắn muốn <strong>${
            record.trang_thai === 1 ? "Khóa" : "Mở khóa"
          }</strong> bài viết không?`,
          icon: record.trang_thai === 1 ? "lock" : "unlock",
          okText: "Đồng ý",
          onOk: async close => {
            changeStatus({
              id: record.id,
              isLock: record.trang_thai === 1,
            })
            close()
          },
        }),
    },
  ]

  useEffect(() => {
    getListPost()
  }, [pagination])
  const getListPost = async () => {
    try {
      setLoading(true)
      const res = await PostService.getListPost({
        ...pagination,
        textSearch,
      })
      setListPost(res?.Object?.data)
      setTotal(res?.Object?.total)
      res?.Object?.data?.forEach(item => {
        let key = item?.id
        form.setFieldsValue({
          [key]: item?.thu_tu,
        })
      })
    } finally {
      setLoading(false)
    }
  }
  const deletePost = async id => {
    try {
      setLoading(true)
      const res = await PostService.deletePost({ id_bai_viet: id })
      if (res.isError) return
      Notice({
        msg: "Xóa bài viết thành công!",
        isSuccess: true,
      })
      getListPost()
    } finally {
      setLoading(false)
    }
  }

  const changeStatus = async body => {
    try {
      setLoading(true)
      const res = await PostService.changeStatus(body)
      if (res.isError) return
      Notice({
        msg: "Cập nhật trạng thái thành công.",
      })
      getListPost()
    } finally {
      setLoading(false)
    }
  }

  const updatePosition = async () => {
    try {
      setLoading(true)
      const values = await form.getFieldsValue()
      //Lọc object khác nhau để đổi thứ tự
      let object = []
      Object.keys(values).forEach(key => {
        if (
          listPost?.find((item, idx) => item?.id === key)?.thu_tu !==
          +values[key]
        )
          object.push({
            id: +key,
            thu_tu: +values[key],
          })
      })
      const res = await PostService.updatePosition(object)
      if (res.isError) return
      Notice({
        msg: "Cập nhật thành công!",
      })
      getListPost()
    } finally {
      setLoading(false)
    }
  }

  const onClickRow = record => {
    if (rowSelected?.find(item => item?.id === record?.id))
      setRowSelected(rowSelected?.filter(item => item?.id !== record?.id))
    else setRowSelected(prev => [...prev, record])
  }
  return (
    <PostManagerStyled>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col flex="auto">
              <FlInput
                search
                allowClear
                label="Nhập tiêu đề bài viết"
                onChange={e => setTextSearch(e?.target?.value)}
                onSearch={() =>
                  setPagination(pre => ({ ...pre, currentPage: 1 }))
                }
              />
            </Col>
            <Col lg={7} xs={24}>
              <FlDatePicker
                ranger
                label={["Từ ngày", "Đến ngày"]}
                format="DD/MM/YYYY"
                onChange={value => {
                  setPagination(pre => ({
                    ...pre,
                    currentPage: 1,
                    fromDate:
                      value?.length && value[0] ? value[0].format() : undefined,
                    toDate:
                      value?.length && value[1] ? value[1].format() : undefined,
                  }))
                }}
              />
            </Col>
            <Col lg={5} xs={24}>
              <FlSelect
                value={pagination?.status}
                label="Trạng thái"
                onChange={status =>
                  setPagination(pre => ({ ...pre, currentPage: 1, status }))
                }
              >
                <Select.Option key={"allStarusTopic"} value={0}>
                  Tất cả
                </Select.Option>
                {STATUS_POST?.map(i => (
                  <Select.Option key={+i.value} value={+i.value}>
                    {i?.label}
                  </Select.Option>
                ))}
              </FlSelect>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <div className="title-type-2 d-flex-sb pb-8">
            <div>Danh sách bài viết ({total ? total : 0}) </div>
            <div className="d-flex-end">
              <Button
                btnType="primary"
                className="btn-hover-shadow mr-10"
                onClick={() => setOpenInsertUpdatePostModal(true)}
              >
                Thêm bài viết
              </Button>
              <Button
                btnType="primary"
                className="btn-hover-shadow"
                onClick={() => updatePosition()}
              >
                Cập nhật vị trí
              </Button>
            </div>
          </div>
          <Form form={form} className="mt-8">
            <TableCustom
              isPrimary
              dataSource={listPost}
              columns={columns}
              loading={loading}
              textEmpty="Không có bài viết"
              sticky={{ offsetHeader: 52 }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {
                    setOpenView(record)
                  },
                }
              }}
              pagination={{
                hideOnSinglePage: total <= 10,
                current: pagination.currentPage,
                pageSize: pagination.pageSize,
                responsive: true,
                total,
                locale: { items_per_page: "" },
                showSizeChanger: total > 10,
                onChange: (page, pageSize) => {
                  setPagination({
                    ...pagination,
                    currentPage: page,
                    pageSize: pageSize,
                  })
                },
              }}
              rowKey="id"
              scroll={{ x: "700px", y: "calc(100vh - 235px)" }}
            />
          </Form>
        </Col>
      </Row>

      {!!openInsertUpdatePostModal && (
        <InsertUpdatePostModal
          open={openInsertUpdatePostModal}
          onCancel={() => {
            setOpenInsertUpdatePostModal(false)
          }}
          onOk={() => {
            getListPost()
          }}
          id={openInsertUpdatePostModal?.id}
        />
      )}
      {!!openView && (
        <ViewPost
          open={openView}
          onCancel={() => {
            setOpenView(false)
          }}
          setBtn={() => setBtn(openView)}
        />
      )}
    </PostManagerStyled>
  )
}

export default PostManager
