import { Col, Form, Row, Select, Tooltip } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { FloatActionWrapper } from "src/components/FloatAction/styles"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import dayjs from "dayjs"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import SpinCustom from "src/components/Spin"
import TableCustom from "src/components/Table/CustomTable"
import {
  MainTableData,
  MainTableHeader,
  SubTableData,
  SubTableHeader,
} from "src/components/Table/CustomTable/styled"
import { STATUS_REQUEST } from "src/constants/constants"
import RequestSupportService from "src/services/RequestSupportService"
import ModalConfirm from "./Modal/ModalConfirm"
import ModalDetailRequest from "./Modal/ModalDetailRequest"
import { StyleButton, StyleRecruitment } from "./styled"
export const statusColor = ["#FF720D", "#00AEAC", "#FF4648"]
const RequestSupport = () => {
  const [form] = Form.useForm()
  const { Option } = Select
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 20,
    textSearch: "",
    status: 0,
  })
  const [dataSource, setDataSource] = useState()
  const [isConfirm, setIsConfirm] = useState(false)
  const [openModalDetailRequest, setOpenModalDetailRequest] = useState(false)

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      width: 60,
      align: "center",
      render: (text, row, idx) => (
        <div className="text-center">
          {idx + 1 + pagination.pageSize * (pagination.currentPage - 1)}
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <MainTableHeader>Mã yêu cầu</MainTableHeader>
        </div>
      ),
      dataIndex: "ma_yc",
      width: 100,
      render: (text, record) => (
        <div className="text-center">
          <MainTableData className="max-line1">{text}</MainTableData>
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <MainTableHeader>Người yêu cầu</MainTableHeader>
          <SubTableHeader>Thời gian yêu cầu</SubTableHeader>
        </div>
      ),
      dataIndex: "ho_ten",
      width: 150,
      render: (text, record) => (
        <div className="text-center">
          <MainTableData className="max-line1">{text}</MainTableData>
          <SubTableData>
            {record.thoi_gian_yc
              ? dayjs(record.thoi_gian_yc).format("HH:mm DD/MM/YYYY")
              : ""}
          </SubTableData>
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <MainTableHeader>Email</MainTableHeader>
          <SubTableHeader>Số điện thoại</SubTableHeader>
        </div>
      ),
      dataIndex: "email",
      width: 150,
      render: (text, record) => (
        <div className="text-center">
          <MainTableData className="max-line1" title={text}>
            {text}
          </MainTableData>
          <SubTableData className="max-line1">{record.sdt}</SubTableData>
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <MainTableHeader>Người hỗ trợ</MainTableHeader>
          <SubTableHeader>Thời gian hỗ trợ</SubTableHeader>
        </div>
      ),
      dataIndex: "ten_nguoi_ht",
      width: 180,
      render: (text, record) => (
        <div className="text-center">
          <MainTableData>{text || ""}</MainTableData>
          <SubTableData>
            {!!record.thoi_gian_ht
              ? moment(record.thoi_gian_ht).format("HH:mm DD/MM/YYYY")
              : "Chưa hỗ trợ"}
          </SubTableData>
        </div>
      ),
    },

    {
      title: "Vấn đề cần hỗ trợ",
      dataIndex: "van_de_ht",
      align: "center",
      render: (text, record) => (
        <Tooltip
          title={
            <div style={{ overflow: "auto", maxHeight: "200px" }}>
              <div>{text}</div>
            </div>
          }
        >
          <div className="max-line2">{text}</div>
        </Tooltip>
      ),
    },
    {
      title: "Nội dung phản hồi",
      dataIndex: "phan_hoi",
      align: "center",
      render: (text, record) => (
        <Tooltip
          title={
            <div style={{ overflow: "auto", maxHeight: "200px" }}>
              <div>{text}</div>
            </div>
          }
        >
          <div className="max-line2">{text}</div>
        </Tooltip>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      align: "center",
      width: 150,
      render: (value, record) => (
        <div className="text-center">
          <div
            style={{ color: `${statusColor[value - 1]}`, fontWeight: "600" }}
          >
            {
              STATUS_REQUEST?.find(item => item?.CodeValue === value)
                ?.Description
            }
          </div>
          <FloatActionWrapper size="small" className="float-action__wrapper">
            {!!record?.list_btns?.xac_nhan && (
              <ButtonCircle
                title="Xác nhận"
                iconName="check-circle"
                style={{
                  background: "#EDF6FC",
                  boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
                }}
                onClick={() => {
                  setIsConfirm({
                    ...record,
                    type: 2,
                  })
                }}
              />
            )}
            {!!record?.list_btns?.tu_choi && (
              <ButtonCircle
                title="Từ chối"
                iconName="cancel"
                style={{
                  background: "#FFE9EC",
                  boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
                }}
                onClick={() => {
                  setIsConfirm({
                    ...record,
                    type: 3,
                  })
                }}
              />
            )}
            {/* {!!record?.list_btns?.thu_hoi && (
              <ButtonCircle
                title="Thu hồi"
                iconName="reply"
                style={{
                  background: "#FFFDE7",
                  boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
                }}
                onClick={() => {
                  CB1({
                    record,
                    title: `Bạn có chắc chắn muốn thu hồi về trạng thái chưa hỗ trợ của yêu cầu mã  
                    "<strong> ${record?.ma_yc}</strong>" không?`,
                    icon: "trashRed",
                    okText: "Đồng ý",
                    onOk: async close => {
                      close()
                    },
                  })
                }}
              />
            )} */}
          </FloatActionWrapper>
        </div>
      ),
    },
  ]
  // data table
  const getListRequest = () => {
    setLoading(true)
    const values = form.getFieldsValue()
    RequestSupportService.getListRequest({
      ...pagination,
      ...values,
    })
      .then(res => {
        if (res.isError) return
        setDataSource(res.Object)
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    form.setFieldsValue({ Status: 0 })
  }, [])
  useEffect(() => {
    getListRequest()
  }, [pagination])

  const handleChangePage = (page, pageSize) => {
    let currentPage = page
    if (pageSize !== pagination.pageSize) {
      currentPage = 1
    }
    setPagination({
      ...pagination,
      currentPage: currentPage,
      pageSize: pageSize,
    })
  }

  const onClickRow = record => {
    setOpenModalDetailRequest({ ...record })
  }
  return (
    <StyleRecruitment>
      <SpinCustom spinning={loading}>
        <Form form={form} className="rq-support">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="textSearch">
                <FlInput
                  search
                  allowClear
                  label="Nhập mã yêu cầu, tên, số điện thoại khách hàng"
                  onSearch={val => {
                    setPagination({
                      ...pagination,
                      currentPage: 1,
                      textSearch: val,
                    })
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item>
                <FlDatePicker
                  allowClear
                  ranger
                  label={["Từ ngày", "Đến ngày"]}
                  onChange={value => {
                    setPagination(pre => ({
                      ...pre,
                      currentPage: 1,
                      fromDate: value ? value[0]?.format() : "",
                      toDate: value ? value[1]?.format() : "",
                    }))
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="Status">
                <FlSelect
                  label="Trạng thái"
                  value={pagination?.status}
                  onChange={status =>
                    setPagination({
                      ...pagination,
                      status: status,
                      currentPage: 1,
                    })
                  }
                >
                  <Option key={"allStatusTopicmain"} value={0}>
                    Tất cả
                  </Option>
                  {STATUS_REQUEST?.map(i => (
                    <Option key={i.CodeValue} value={i.CodeValue}>
                      {i?.Description}
                    </Option>
                  ))}
                </FlSelect>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className="title-type-1 d-flex justify-content-space-between align-items-center mb-16 mt-8">
          Danh sách yêu cầu hỗ trợ
        </div>
        <TableCustom
          isPrimary
          sticky={{ offsetHeader: -12 }}
          scroll={{ x: 1000 }}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                onClickRow(record)
              },
            }
          }}
          columns={columns}
          dataSource={dataSource?.data}
          pagination={{
            hideOnSinglePage: dataSource?.total <= 10,
            current: pagination.currentPage,
            pageSize: pagination.pageSize,
            responsive: true,
            total: dataSource?.total,
            locale: { items_per_page: "" },
            showSizeChanger: dataSource?.total > 10,
            onChange: (page, pageSize) => handleChangePage(page, pageSize),
          }}
          rowKey="id"
        />

        {!!isConfirm && (
          <ModalConfirm
            open={isConfirm}
            onCancel={() => setIsConfirm(false)}
            onOk={() => {
              getListRequest()
            }}
          />
        )}
        {!!openModalDetailRequest && (
          <ModalDetailRequest
            open={openModalDetailRequest}
            onCancel={() => {
              setOpenModalDetailRequest(false)
            }}
            onOk={() => {
              getListRequest()
            }}
          />
        )}
      </SpinCustom>
    </StyleRecruitment>
  )
}

export default RequestSupport
