import { Col, Row, Select, Space } from "antd"
import { useEffect, useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import { COLOR_STATUS, STATUS_ACTIVE } from "src/constants/constants"
import TagService from "src/services/TagService"
import ModalInsertUpdate from "./components/ModalInsertUpdate"
import { TagsManagerStyle } from "./styled"
import { saveAs } from "file-saver"
const TagsManager = () => {
  const [pagination, setPagination] = useState({
    pageSize: 10,
    currentPage: 1,
    textSearch: "",
    status: 1,
  })
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [openInsert, setOpenInsert] = useState(false)

  const columns = [
    {
      title: "STT",
      dataIndex: "Index",
      key: "Index",
      width: 60,
      align: "center",
      render: (val, record, idx) => (
        <div className="text-center">
          {idx + 1 + pagination?.pageSize * (pagination?.currentPage - 1)}
        </div>
      ),
    },
    {
      title: "Mã thẻ",
      dataIndex: "ma_the",
      key: "ma_the",
      align: "left",
      width: 250,
    },
    {
      title: "Tên thẻ",
      dataIndex: "ten_the",
      key: "ten_the",
      align: "left",
      width: 300,
    },
    {
      title: "Ghi chú",
      dataIndex: "ghi_chu",
      key: "ghi_chu",
      align: "left",
      render: (text, record) => (
        <div className="max-line2" title={text}>
          {text}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
      align: "left",
      width: 200,
      render: (text, record) => (
        <div className="d-flex justify-content-space-between align-items-center mh-36">
          <div className="max-line1" style={{ color: COLOR_STATUS[text] }}>
            {STATUS_ACTIVE.find(i => i.value === +text)?.label}
          </div>
          <div className="list-button-hover">{renderListButton(record)}</div>
        </div>
      ),
    },
  ]
  const renderListButton = record => {
    return (
      <Space>
        <ButtonCircle
          title="Cập nhật"
          iconName="edit-green"
          // style={{ background: "#DDFEF0" }}
          onClick={() =>
            setOpenInsert({
              ...record,
              isUpdate: true,
            })
          }
        />
        <ButtonCircle
          title="Xóa"
          iconName="delete-red-row"
          onClick={() => {
            CB1({
              record,
              title: `Bạn có chắc chắn muốn xoá thẻ
              "<strong> ${record?.ten_the}</strong>" không?`,
              icon: "trashRed",
              okText: "Đồng ý",
              onOk: async close => {
                deleteTags(record?.id)
                close()
              },
            })
          }}
        />
        <ButtonCircle
          title={record.trang_thai === 1 ? "Khóa thẻ" : "Mở khóa"}
          iconName={record.trang_thai === 1 ? "lock" : "unlock"}
          // style={{ background: "#EDF6FC" }}
          onClick={() =>
            CB1({
              title: `Bạn có chắc chắn muốn <strong>${
                record.trang_thai === 1 ? "Khóa" : "Mở khóa"
              }</strong> thẻ "<strong>${record?.ten_the}</strong>" không?`,
              icon: record.trang_thai === 1 ? "lock" : "unlock",
              okText: "Đồng ý",
              onOk: async close => {
                changeStatus({
                  id: record.id,
                  isLock: record.trang_thai === 1,
                })
                close()
              },
            })
          }
        />
      </Space>
    )
  }

  const deleteTags = async id => {
    try {
      setLoading(true)
      const res = await TagService.deleteTags({ id_the: id })
      if (res.isError) return
      Notice({
        msg: "Xóa thẻ thành công.",
      })
      getList()
    } finally {
      setLoading(false)
    }
  }
  const changeStatus = async body => {
    try {
      setLoading(true)
      const res = await TagService.changeStatus(body)
      if (res.isError) return
      Notice({
        msg: "Cập nhật trạng thái thành công.",
      })
      getList()
    } finally {
      setLoading(false)
    }
  }

  const getList = async () => {
    try {
      setLoading(true)
      const res = await TagService.getListTags(pagination)
      if (res.isError) return
      setData(res.Object.data)
      setTotal(res.Object.total)
    } finally {
      setLoading(false)
    }
  }
  const exportExcel = async () => {
    try {
      setLoading(true)
      const res = await TagService.exportExcel(pagination)
      if (res.isError) return
      saveAs(res, "Danh sách thẻ bài viết.xlsx")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getList()
  }, [pagination])

  return (
    <TagsManagerStyle>
      <Row gutter={16} className="mb-8">
        <Col span={18}>
          <FlInput
            onSearch={textSearch =>
              setPagination({
                ...pagination,
                textSearch,
                currentPage: 1,
              })
            }
            search
            allowClear
            label="Nhập tên thẻ"
          />
        </Col>
        <Col span={6}>
          <FlSelect
            label="Trạng thái"
            value={pagination?.status}
            onChange={status => {
              setPagination({
                ...pagination,
                status: status,
                currentPage: 1,
              })
            }}
          >
            <Select.Option key={0} value={0}>
              Tất cả
            </Select.Option>
            {STATUS_ACTIVE.map(i => (
              <Select.Option key={+i.value} value={+i.value}>
                {i?.label}
              </Select.Option>
            ))}
          </FlSelect>
        </Col>
      </Row>
      <div className="title-type-1 d-flex justify-content-space-between align-items-center pb-8 pt-0 mb-16">
        <div style={{ fontSize: 24 }}>Danh sách thẻ ({total})</div>
        <Space size={12}>
          <Button
            btnType="primary"
            className="btn-hover-shadow"
            onClick={() => setOpenInsert(true)}
          >
            Thêm thẻ
          </Button>
          <Button btnType="third" onClick={() => exportExcel()}>
            Export Excel
          </Button>
        </Space>
      </div>
      <TableCustom
        isPrimary
        dataSource={data}
        columns={columns}
        onRow={record => {
          return {
            onClick: () => {},
          }
        }}
        sticky={{ offsetHeader: -12 }}
        loading={loading}
        textEmpty="Không có dữ liệu"
        pagination={{
          hideOnSinglePage: total <= 10,
          current: pagination?.currentPage,
          pageSize: pagination?.pageSize,
          responsive: true,
          total: total,
          locale: { items_per_page: "" },
          showSizeChanger: total > 10,
          onChange: (page, pageSize) => {
            let currentPage = page
            if (pageSize !== pagination.pageSize) {
              currentPage = 1
            }
            setPagination({
              ...pagination,
              currentPage: currentPage,
              pageSize: pageSize,
            })
          },
        }}
        rowKey="id"
        scroll={{ x: "800px" }}
      />
      {openInsert && (
        <ModalInsertUpdate
          open={openInsert}
          onCancel={() => setOpenInsert(false)}
          onOk={getList}
        />
      )}
    </TagsManagerStyle>
  )
}

export default TagsManager
