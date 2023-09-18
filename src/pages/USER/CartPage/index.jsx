import { Col, Form, Image, InputNumber, Row, Spin, message } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import ModalSelectLocal from "./components/ModalSelectLocal"
import LayoutCommon from "src/components/Common/Layout"
import TableCustom from "src/components/Table/CustomTable"
import { InputChangeQuantity } from "src/pages/ANONYMOUS/ProductDetail/styled"
import { setListCart } from "src/redux/appGlobal"
import CartService from "src/services/CartService"
import { CartPageStyle } from "./styled"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Button from "src/components/MyButton/Button"
import { ArrowRightOutlined } from "@ant-design/icons"
import CB1 from "src/components/Modal/CB1"

const CartPage = () => {
  const { listCart, userInfo } = useSelector(state => state.appGlobal)

  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [rowSelected, setRowSelected] = useState(listCart)
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 20,
    TextSearch: "",
    // TopicMain: "",
  })
  const getListCart = async id_nguoi_dung => {
    try {
      setLoading(true)
      const res = await CartService.getListCart({ id_nguoi_dung })
      if (res.isError) return
      dispatch(setListCart(res.Object))
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (userInfo.id) {
    }
  }, [])

  const changeValueTable = (idx, object) => {
    dispatch(
      setListCart(
        listCart?.map((i, index) => {
          if (+i.id !== +object.id) return i
          return { ...i, ...object }
        }),
      ),
    )
    setRowSelected(pre =>
      pre?.map((i, index) => {
        if (+i.id !== +object.id) return i
        return { ...i, ...object }
      }),
    )
  }

  const columns = [
    {
      title: `Sản phẩm`,
      dataIndex: "ten_san_pham",
      key: "ten_san_pham",
      align: "left",
      render: (value, record, index) => (
        <div className="d-flex align-items-center justify-content-flex-start">
          <Image src={record?.anh} width={50} alt={value} preview={false} />
          <div className="ml-8">
            <div
              style={{ color: "var(--color-brown-dark)" }}
              className="fw-600"
            >
              {value}
            </div>
            <div className="fs-12" style={{ color: "var(--color-yellow)" }}>
              {record?.size}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: `Giá`,
      dataIndex: "gia_ban",
      key: "gia_ban",
      align: "left",
      width: 140,
      render: (value, record, index) => (
        <strong style={{ color: "var(--color-brown-dark)" }}>
          {value?.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </strong>
      ),
    },
    {
      title: `Số lượng`,
      dataIndex: "so_luong",
      key: "so_luong",
      align: "left",
      width: 140,
      render: (value, record, index) => (
        <InputChangeQuantity>
          <button
            className="btn-change"
            disabled={value === 1}
            onClick={() =>
              changeValueTable(index, {
                ...record,
                so_luong: value - 1,
              })
            }
          >
            -
          </button>
          <InputNumber
            className="input-change"
            value={value}
            onChange={event =>
              changeValueTable(index, {
                ...record,
                so_luong: event?.target?.value ? +event?.target?.value : 1,
              })
            }
            min={1}
            max={100}
            step={1}
            keyboard={false}
            // formatter={value => `${value}%`}
            // parser={value => value.replace("%", "")}
          />
          <button
            className="btn-change"
            disabled={value >= 100}
            onClick={() =>
              changeValueTable(index, {
                ...record,
                so_luong: value + 1,
              })
            }
          >
            +
          </button>
        </InputChangeQuantity>
      ),
    },
    {
      title: `Tạm tính`,
      dataIndex: "total",
      key: "total",
      align: "left",
      width: 140,
      render: (value, record, index) => (
        <div className="d-flex align-items-center justify-content-space-between">
          <strong style={{ color: "var(--color-brown-dark)" }}>
            {(record.so_luong
              ? record.so_luong * record.gia_ban
              : 0
            )?.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </strong>
          <ButtonCircle
            // title="Xóa sản phẩm"
            iconName="cancel"
            onClick={() => {
              CB1({
                title: `Bạn có chắc chắn muốn xóa sản phẩm "${record.ten_san_pham}" khỏi giỏ hàng không?`,
                icon: "trashRed",
                okText: "Đồng ý",
                onOk: () => {
                  setLoading(true)
                  CartService.deleteCart({
                    cartIds: [record.id],
                  })
                    .then(res => {
                      if (res?.isOk) {
                        dispatch(
                          setListCart(
                            listCart?.filter(i => i.id !== record.id),
                          ),
                        )
                        setRowSelected(pre =>
                          pre?.filter(i => i.id !== record.id),
                        )
                      }
                    })
                    .finally(() => setLoading(false))
                },
              })
            }}
          />
        </div>
      ),
    },
  ]

  return (
    <CartPageStyle>
      <LayoutCommon>
        <Spin spinning={loading}>
          <div
            className="fs-24 fw-600 mb-12"
            style={{ color: "var(--color-brown-dark)" }}
          >
            Danh sách sản phẩm
          </div>
          <Row gutter={24}>
            <Col span={16} className="pb-16">
              <TableCustom
                dataSource={listCart}
                columns={columns}
                sticky={{ offsetHeader: -12 }}
                textEmpty="Không có dữ liệu"
                rowSelection={{
                  type: "checkbox",
                  preserveSelectedRowKeys: true,
                  selectedRowKeys: rowSelected?.map(i => i?.id),
                  onChange: (selectedRows, selectedRowKeys) => {
                    setRowSelected(selectedRowKeys)
                  },
                }}
                pagination={false}
                // pagination={{
                //   hideOnSinglePage: listCart?.length <= 10,
                //   current: pagination?.CurrentPage,
                //   pageSize: pagination?.PageSize,
                //   responsive: true,
                //   total: listCart?.length,
                //   locale: { items_per_page: "" },
                //   showSizeChanger: listCart?.length > 20,
                //   onChange: (page, pageSize) => {
                //     setPagination({
                //       ...pagination,
                //       CurrentPage: page,
                //       PageSize: pageSize,
                //     })
                //   },
                // }}
                rowKey="id"
                scroll={{ x: "800px", y: "calc(100vh - 240px)" }}
              />
            </Col>
            <Col
              span={8}
              style={{ borderLeft: "1px solid #ddd", height: "auto" }}
            >
              <div className="mb-24">
                <div
                  className="fs-16 fw-600 pb-12 text-uppercase mb-12 d-flex align-items-flex-end"
                  style={{ borderBottom: "2px solid #ddd", height: 50 }}
                >
                  CỘNG GIỎ HÀNG
                </div>
                <div
                  className="d-flex align-items-flex-end justify-content-space-between pt-12 pb-12 pr-12"
                  style={{
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <div>Tạm tính</div>
                  <div
                    className="fw-600"
                    // style={{
                    //   color: "var(--color-orange)",
                    // }}
                  >
                    {rowSelected
                      .reduce((total, i) => total + i.gia_ban * i.so_luong, 0)
                      .toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                  </div>
                </div>
                <div
                  className="d-flex align-items-flex-end justify-content-space-between pt-12 pb-12 pr-12 fs-16"
                  style={{
                    borderBottom: "2px solid #ddd",
                  }}
                >
                  <div className="fw-600">Tổng</div>
                  <div
                    className="fw-600"
                    style={{
                      color: "var(--color-orange)",
                    }}
                  >
                    {rowSelected
                      .reduce((total, i) => total + i.gia_ban * i.so_luong, 0)
                      .toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                  </div>
                </div>
              </div>
              <Button
                btnType="orange"
                className="w-100 d-flex align-items-center"
                disabled={!rowSelected.length}
              >
                ĐẶT HÀNG NGAY <ArrowRightOutlined className="ml-16" />
              </Button>
            </Col>
          </Row>
        </Spin>
      </LayoutCommon>
    </CartPageStyle>
  )
}

export default CartPage
