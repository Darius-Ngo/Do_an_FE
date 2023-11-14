import { UserOutlined } from "@ant-design/icons"
import { Avatar, Col, Row, Select, Space } from "antd"
import { useEffect, useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import {
  MainTableData,
  MainTableHeader,
  SubTableData,
  SubTableHeader,
} from "src/components/Table/CustomTable/styled"
import { COLOR_STATUS, ROLE_LIST, STATUS_ACTIVE } from "src/constants/constants"
import AccountService from "src/services/AccountService"
import ModalInsertUpdate from "./components/ModalInsertUpdate"
import { EmployeeManagerStyle } from "./styled"
const EmployeeManager = () => {
  const [pagination, setPagination] = useState({
    pageSize: 10,
    currentPage: 1,
    textSearch: "",
    isCustomer: false,
    status: 1,
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
    {
      title: "Ảnh",
      dataIndex: "avatar",
      key: "avatar",
      render: value => <Avatar src={value} icon={<UserOutlined />} size={40} />,
      width: 100,
      align: "center",
    },
    {
      title: (
        <>
          <MainTableHeader>Tài khoản</MainTableHeader>
          <SubTableHeader>Họ tên</SubTableHeader>
        </>
      ),
      dataIndex: "ho_ten",
      key: "ho_ten",
      width: 160,
      align: "left",
      render: (val, record) => (
        <>
          <MainTableData>{record?.username}</MainTableData>
          <SubTableData>{val}</SubTableData>
        </>
      ),
    },
    {
      title: (
        <>
          <MainTableHeader>Email</MainTableHeader>
          <SubTableHeader>Số điện thoại</SubTableHeader>
        </>
      ),
      dataIndex: "sdt",
      key: "sdt",
      width: 200,
      align: "left",
      render: (val, record) => (
        <>
          <MainTableData>{record?.email}</MainTableData>
          <SubTableData>{val}</SubTableData>
        </>
      ),
    },
    {
      title: (
        <>
          <MainTableHeader>Số CMT/CCCD</MainTableHeader>
          <SubTableHeader>Phân quyền</SubTableHeader>
        </>
      ),
      dataIndex: "id_phan_quyen",
      key: "id_phan_quyen",
      width: 200,
      align: "left",
      render: (val, record) => (
        <>
          <MainTableData>{record?.cccd}</MainTableData>
          <SubTableData>
            {ROLE_LIST.find(i => i.value === +val).label}
          </SubTableData>
        </>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "dia_chi",
      key: "dia_chi",
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
      width: 160,
      render: (text, record) => (
        <div className="d-flex justify-content-space-between align-items-center mh-36">
          <div className="max-line2" style={{ color: COLOR_STATUS[text] }}>
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
              title: `Bạn có chắc chắn muốn xoá nhân viên
              "<strong> ${record?.ho_ten}</strong>" có tên tài khoản là "<strong> ${record?.username}</strong>" không?`,
              icon: "trashRed",
              okText: "Đồng ý",
              onOk: async close => {
                deleteUser(record?.id)
                close()
              },
            })
          }}
        />
        <ButtonCircle
          title="Reset mật khẩu"
          iconName="reset-pass"
          // style={{ background: "#EDF6FC" }}
          onClick={() =>
            CB1({
              title: `Bạn có chắc chắn muốn <strong>Reset mật khẩu</strong> tài khoản "<strong>${record?.username}</strong>" không?`,
              icon: "reset-pass",
              okText: "Đồng ý",
              onOk: async close => {
                resetPassword(record.id)
                close()
              },
            })
          }
        />
        <ButtonCircle
          title={record.trang_thai === 1 ? "Khóa tài khoản" : "Mở khóa"}
          iconName={record.trang_thai === 1 ? "lock" : "unlock"}
          // style={{ background: "#EDF6FC" }}
          onClick={() =>
            CB1({
              title: `Bạn có chắc chắn muốn <strong>${
                record.trang_thai === 1 ? "Khóa" : "Mở khóa"
              }</strong> tài khoản "<strong>${
                record?.username
              }</strong>" không?`,
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

  const deleteUser = async id => {
    try {
      setLoading(true)
      const res = await AccountService.deleteUser(id)
      if (res.isError) return
      Notice({
        msg: "Xóa nhân viên thành công.",
      })
      getList()
    } finally {
      setLoading(false)
    }
  }
  const resetPassword = async id => {
    try {
      setLoading(true)
      const res = await AccountService.resetPassword({ id })
      if (res.isError) return
      Notice({
        msg: "Reset mật khẩu thành công.",
      })
      getList()
    } finally {
      setLoading(false)
    }
  }
  const changeStatus = async body => {
    try {
      setLoading(true)
      const res = await AccountService.changeStatus(body)
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
      const res = await AccountService.getListUser(pagination)
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
    <EmployeeManagerStyle>
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
            label="Nhập tên, số điện thoại, số CCCD nhân viên"
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
      <div className="title-type-1 d-flex justify-content-space-between align-items-center pb-8 pt-0 mb-16">
        <div style={{ fontSize: 24 }}>Danh sách nhân viên ({total})</div>
        <Button
          btnType="primary"
          className="btn-hover-shadow"
          onClick={() => setOpenInsert(true)}
        >
          Thêm nhân viên
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
        textEmpty="Không có nhân viên"
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
    </EmployeeManagerStyle>
  )
}

export default EmployeeManager
