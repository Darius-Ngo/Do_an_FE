import { Col, Image, Row, Select, Space } from "antd"
import { useEffect, useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import { COLOR_STATUS, FAILBACK, STATUS_ACTIVE } from "src/constants/constants"
import CategoryService from "src/services/CategoryService"
import ModalInsertUpdate from "./components/ModalInsertUpdate"
import { CategoryManagerStyle } from "./styled"
const CategoryManager = () => {
  const [pagination, setPagination] = useState({
    pageSize: 20,
    currentPage: 1,
    textSearch: "",
  })
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [openModalDetail, setOpenModalDetail] = useState(false)
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
    // {
    //   title: "Ảnh",
    //   dataIndex: "anh",
    //   key: "anh",
    //   width: 120,
    //   align: "center",
    //   render: value => <Image src={value} width={"100%"} fallback={FAILBACK} />,
    // },
    {
      title: "Tên danh mục",
      dataIndex: "ten_loai_san_pham",
      key: "ten_loai_san_pham",
      align: "left",
      width: 250,
      render: (text, record) => (
        <div className="max-line2" title={text}>
          {text}
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "mo_ta",
      key: "mo_ta",
      align: "left",
      render: (text, record) => (
        <div
          className="max-line2"
          title={text}
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      ),
    },
    // {
    //   title: "Ghi chú",
    //   dataIndex: "ghi_chu",
    //   key: "ghi_chu",
    //   align: "left",
    //   render: (text, record) => (
    //     <div className="max-line2" title={text}>
    //       {text}
    //     </div>
    //   ),
    // },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
      align: "left",
      width: 160,
      render: (text, record) => (
        <div className="d-flex justify-content-space-between align-items-center mh-36">
          <div className="max-line1" style={{ color: COLOR_STATUS[text] }}>
            {STATUS_ACTIVE.find(i => i.value === +text).label}
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
              title: `Bạn có chắc chắn muốn xoá danh mục
              "<strong> ${record?.ten_loai_san_pham}</strong>" không?`,
              icon: "trashRed",
              okText: "Đồng ý",
              onOk: async close => {
                deleteCategory(record?.id)
                close()
              },
            })
          }}
        />
        <ButtonCircle
          title={!!record.trang_thai ? "Khóa danh mục" : "Mở khóa"}
          iconName={!!record.trang_thai ? "lock" : "unlock"}
          // style={{ background: "#EDF6FC" }}
          onClick={() =>
            CB1({
              title: `Bạn có chắc chắn muốn <strong>${
                !!record.trang_thai ? "Khóa" : "Mở khóa"
              }</strong> danh mục "<strong>${
                record?.ten_loai_san_pham
              }</strong>" không?`,
              icon: !!record.trang_thai ? "lock" : "unlock",
              okText: "Đồng ý",
              onOk: async close => {
                changeStatus({
                  id: record.id,
                  isLock: !!record.trang_thai,
                })
                close()
              },
            })
          }
        />
      </Space>
    )
  }

  const deleteCategory = async id => {
    try {
      setLoading(true)
      const res = await CategoryService.deleteCategory(id)
      if (res.isError) return
      Notice({
        msg: "Xóa danh mục thành công.",
      })
      getList()
    } finally {
      setLoading(false)
    }
  }
  const changeStatus = async body => {
    try {
      setLoading(true)
      const res = await CategoryService.changeStatus(body)
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
      const res = await CategoryService.getListCategory(pagination)
      if (res.isError) return
      setData(res.Object.data)
      setTotal(res.Object.total)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getList()
  }, [pagination])

  return (
    <CategoryManagerStyle>
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
            label="Nhập tên danh mục"
          />
        </Col>
        <Col span={6}>
          <FlSelect
            label="Trạng thái"
            onChange={status => {
              setPagination({
                ...pagination,
                status: status,
                currentPage: 1,
              })
            }}
            allowClear
          >
            {STATUS_ACTIVE.map(i => (
              <Select.Option key={+i.value} value={+i.value}>
                {i?.label}
              </Select.Option>
            ))}
          </FlSelect>
        </Col>
      </Row>
      <div className="title-type-1 d-flex justify-content-space-between align-items-center pb-8 pt-0 mb-16">
        <div style={{ fontSize: 24 }}>Danh sách danh mục</div>
        <Button
          btnType="primary"
          className="btn-hover-shadow"
          onClick={() => setOpenInsert(true)}
        >
          Thêm danh mục
        </Button>
      </div>
      <TableCustom
        isPrimary
        dataSource={data}
        columns={columns}
        onRow={record => {
          return {
            onClick: () => {
              setOpenModalDetail(record)
            },
          }
        }}
        sticky={{ offsetHeader: -12 }}
        loading={loading}
        textEmpty="Không có danh mục"
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
    </CategoryManagerStyle>
  )
}

export default CategoryManager
