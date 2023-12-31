import { Badge, Col, Image, Row, Select, Space } from "antd"
import { useEffect, useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import { COLOR_STATUS, FAILBACK, STATUS_ACTIVE } from "src/constants/constants"
import ProductService from "src/services/ProductService"
import ModalInsertUpdate from "./components/ModalInsertUpdate"
import { ProductManagerStyle } from "./styled"
import ListCategory from "./components/ListCategory"
import { formatMoney } from "src/lib/utils"
import CategoryService from "src/services/CategoryService"
import { saveAs } from "file-saver"
const ProductManager = () => {
  const [pagination, setPagination] = useState({
    pageSize: 10,
    currentPage: 1,
    textSearch: "",
    status: 1,
  })
  const [loading, setLoading] = useState(false)
  const [listCategory, setListCategory] = useState([])
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const [openInsert, setOpenInsert] = useState(false)
  const [categorySelected, setCategorySelected] = useState()

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
      title: "Ảnh",
      dataIndex: "anh",
      key: "anh",
      width: 120,
      align: "center",
      render: (value, record) => (
        <Badge.Ribbon
          text={record.isDiscord ? `-${record.giam_gia}%` : ""}
          color="volcano"
          style={!record.isDiscord && { display: "none" }}
        >
          <Image src={value} width={"100%"} fallback={FAILBACK} />
        </Badge.Ribbon>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "ten_san_pham",
      key: "ten_san_pham",
      align: "left",
      render: (text, record) => (
        <div className="max-line1" title={text}>
          {text}
        </div>
      ),
    },
    {
      title: "Giá size S",
      dataIndex: "gia_ban_sizes",
      key: "gia_ban_sizes",
      align: "left",
      width: 120,
      render: (text, record) =>
        record.isDiscord ? (
          <div>
            <div className="fw-600 mr-10">
              {formatMoney(text * ((100 - record.giam_gia) / 100))}
            </div>
            <del className="sub-text fs-12">{formatMoney(text)}</del>
          </div>
        ) : (
          formatMoney(text)
        ),
    },
    {
      title: "Giá size M",
      dataIndex: "gia_ban_sizem",
      key: "gia_ban_sizem",
      align: "left",
      width: 120,
      render: (text, record) =>
        record.isDiscord ? (
          <div>
            <div className="fw-600 mr-10">
              {formatMoney(text * ((100 - record.giam_gia) / 100))}
            </div>
            <del className="sub-text fs-12">{formatMoney(text)}</del>
          </div>
        ) : (
          formatMoney(text)
        ),
    },
    {
      title: "Giá size L",
      dataIndex: "gia_ban_sizel",
      key: "gia_ban_sizel",
      align: "left",
      width: 120,
      render: (text, record) =>
        record.isDiscord ? (
          <div>
            <div className="fw-600 mr-10">
              {formatMoney(text * ((100 - record.giam_gia) / 100))}
            </div>
            <del className="sub-text fs-12">{formatMoney(text)}</del>
          </div>
        ) : (
          formatMoney(text)
        ),
    },
    // {
    //   title: "Ghi chú",
    //   dataIndex: "ghi_chu",
    //   key: "ghi_chu",
    //   align: "left",
    //   render: (text, record) => (
    //     <div className="max-line1" title={text}>
    //       {text}
    //     </div>
    //   ),
    // },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai_sp",
      key: "trang_thai_sp",
      align: "left",
      width: 160,
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
              id_loai_san_pham: categorySelected.id,
            })
          }
        />
        <ButtonCircle
          title="Xóa"
          iconName="delete-red-row"
          onClick={() => {
            CB1({
              record,
              title: `Bạn có chắc chắn muốn xoá sản phẩm
              "<strong> ${record?.ten_san_pham}</strong>" không?`,
              icon: "trashRed",
              okText: "Đồng ý",
              onOk: async close => {
                deleteProduct(record?.id)
                close()
              },
            })
          }}
        />
        <ButtonCircle
          title={record.trang_thai_sp === 1 ? "Khóa sản phẩm" : "Mở khóa"}
          iconName={record.trang_thai_sp === 1 ? "lock" : "unlock"}
          onClick={() =>
            CB1({
              title: `Bạn có chắc chắn muốn <strong>${
                record.trang_thai_sp === 1 ? "Khóa" : "Mở khóa"
              }</strong> sản phẩm "<strong>${
                record?.ten_san_pham
              }</strong>" không?`,
              icon: record.trang_thai_sp === 1 ? "lock" : "unlock",
              okText: "Đồng ý",
              onOk: async close => {
                changeStatus({
                  id: record.id,
                  isLock: record.trang_thai_sp === 1,
                })
                close()
              },
            })
          }
        />
      </Space>
    )
  }

  const deleteProduct = async id => {
    try {
      setLoading(true)
      const res = await ProductService.deleteProduct(id)
      if (res.isError) return
      Notice({
        msg: "Xóa sản phẩm thành công.",
      })
      getList()
    } finally {
      setLoading(false)
    }
  }
  const changeStatus = async body => {
    try {
      setLoading(true)
      const res = await ProductService.changeStatus(body)
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
      const res = await ProductService.getListProduct({
        ...pagination,
        id_loai_san_pham: categorySelected.id,
      })
      if (res.isError) return
      setData(res.Object.data)
      setTotal(res.Object.total)
    } finally {
      setLoading(false)
    }
  }
  const getListCategory = async () => {
    try {
      setLoading(true)
      const res = await CategoryService.getListCategory({
        status: 1,
      })
      if (res.isError) return
      setListCategory(res.Object?.data)
      setCategorySelected(res.Object?.data[0])
    } finally {
      setLoading(false)
    }
  }
  const exportExcel = async () => {
    try {
      setLoading(true)
      const res = await ProductService.exportExcel({
        ...pagination,
        id_loai_san_pham: categorySelected.id,
      })
      if (res.isError) return
      saveAs(res, "Danh sách sản phẩm.xlsx")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getListCategory()
  }, [])
  useEffect(() => {
    if (categorySelected)
      setPagination({
        ...pagination,
        currentPage: 1,
      })
  }, [categorySelected])
  useEffect(() => {
    if (categorySelected) getList()
  }, [pagination])

  return (
    <ProductManagerStyle>
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
            label="Nhập tên sản phẩm"
          />
        </Col>
        <Col span={6}>
          <FlSelect
            label="Trạng thái"
            value={pagination.status}
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
      <Row gutter={16}>
        <Col style={{ width: 300 }}>
          <ListCategory
            listCategory={listCategory}
            categorySelected={categorySelected}
            setCategorySelected={setCategorySelected}
          />
        </Col>
        <Col style={{ width: 0 }} flex={"auto"}>
          <div className="title-type-1 d-flex justify-content-space-between align-items-center pb-8 pt-0 mb-16">
            <div style={{ fontSize: 24 }}>Danh sách sản phẩm ({total})</div>
            <Space size={12}>
              <Button
                btnType="primary"
                className="btn-hover-shadow"
                onClick={() =>
                  setOpenInsert({
                    id_loai_san_pham: categorySelected.id,
                  })
                }
              >
                Thêm sản phẩm
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
                onClick: () => {
                  setOpenModalDetail(record)
                },
              }
            }}
            sticky={{ offsetHeader: -12 }}
            loading={loading}
            textEmpty="Không có sản phẩm"
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
        </Col>
      </Row>
      {openInsert && (
        <ModalInsertUpdate
          listCategory={listCategory}
          open={openInsert}
          onCancel={() => setOpenInsert(false)}
          onOk={getList}
        />
      )}
    </ProductManagerStyle>
  )
}

export default ProductManager
