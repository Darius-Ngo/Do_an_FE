import { Col, Form, Image, Radio, Row, Spin } from "antd"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import FlInput from "src/components/FloatingLabel/Input"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SelectAddress from "src/components/SelectAddress"
import { setListCart } from "src/redux/appGlobal"
import CartService from "src/services/CartService"
import OrderService from "src/services/OrderService"
import { InfoOrderStyle } from "../styled"
import ROUTER from "src/router"
import ModalSelectAddress from "./ModalSelectAddress"
import { getRegexPhoneNumber } from "src/lib/stringsUtils"
import { formatMoneyVND } from "src/lib/utils"

const InfoOrder = ({ listProduct, userInfo, totalMoney }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [openModalAddress, setOpenModalAddress] = useState(false)
  const [addressSelect, setAddressSelect] = useState(false)
  const [typePay, setTypePay] = useState(1)

  const getListAddress = async () => {
    try {
      setLoading(true)
      const res = await OrderService.getListAddressOrder({
        id_nguoi_dung: userInfo.id,
      })
      if (res.isError) return
      if (res.Object?.length) {
        setAddressSelect(res.Object[0])
      } else {
        setAddressSelect({
          ten_nguoi_nhan: userInfo.ho_ten,
          sdt_nguoi_nhan: userInfo.sdt,
          id_tp: userInfo.id_tp,
          id_qh: userInfo.id_qh,
          id_xp: userInfo.id_xp,
          dia_chi_chi_tiet: userInfo.thon_xom,
        })
      }
    } finally {
      setLoading(false)
    }
  }
  const handleOrder = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      const res = await OrderService.addOrder({
        ...values,
        id_nguoi_dat: userInfo.id,
        kieu_thanh_toan: 1,
        ds_san_pham: listProduct,
      })
      if (res.isError) return
      getListCart()
      Notice({
        msg: "Đặt hàng thành công.",
      })
      navigate(ROUTER.THUC_DON)
    } finally {
      setLoading(false)
    }
  }
  const getListCart = async () => {
    try {
      setLoading(true)
      const res = await CartService.getListCart({ id_nguoi_dung: userInfo.id })
      if (res.isError) return
      dispatch(setListCart(res.Object))
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getListAddress()
  }, [])
  useEffect(() => {
    form.setFieldsValue(addressSelect)
  }, [addressSelect])
  console.log("addressSelect", addressSelect)
  return (
    <Spin spinning={loading}>
      <InfoOrderStyle>
        <Row gutter={24}>
          <Col span={16} className="pb-16">
            <div
              className="fs-16 fw-600 mb-16 pb-12 text-uppercase d-flex justify-content-space-between align-items-flex-end"
              style={{ borderBottom: "2px solid #ddd" }}
            >
              Thông tin đặt hàng
              <Button
                btnType="orange-third"
                className="d-flex align-items-center"
                onClick={() => setOpenModalAddress(true)}
              >
                Địa chỉ đã lưu
              </Button>
            </div>
            <Form layout="vertical" form={form} initialValues={addressSelect}>
              <Row gutter={24}>
                <Col span={24}>
                  <div className="fw-600 mb-12">Thông tin người nhận</div>
                </Col>
                <Col span={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Tên người nhận không được để trống!",
                      },
                    ]}
                    name={"ten_nguoi_nhan"}
                  >
                    <FlInput label="Tên người nhận" isRequired />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "SĐT người nhận không được để trống!",
                      },
                      {
                        pattern: getRegexPhoneNumber(),
                        message: "Số điện thoại sai định dạng",
                      },
                    ]}
                    name={"sdt_nguoi_nhan"}
                  >
                    <FlInput label="SĐT người nhận" isRequired />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <div className="fw-600 mb-12">Địa chỉ nhận hàng</div>
                </Col>
                <Col span={24}>
                  <SelectAddress
                    floating={true}
                    form={form}
                    required
                    initValue={
                      addressSelect
                        ? {
                            id_tp: addressSelect?.id_tp,
                            id_qh: addressSelect?.id_qh,
                            id_xp: addressSelect?.id_xp,
                          }
                        : {}
                    }
                    listFormName={["id_tp", "id_qh", "id_xp"]}
                  />
                </Col>
                <Col span={24}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Địa chỉ chi tiết không được để trống!",
                      },
                    ]}
                    name={"dia_chi_chi_tiet"}
                  >
                    <FlInput label="Địa chỉ chi tiết" isRequired />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <div className="fw-600 mb-12">Ghi chú cho cửa hàng</div>
                </Col>
                <Col span={24}>
                  <Form.Item name={"ghi_chu"}>
                    <FlInput textArea label="Ghi chú" style={{ height: 120 }} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col
            span={8}
            style={{ borderLeft: "1px solid #ddd", height: "auto" }}
          >
            <div className="mb-24">
              <div
                className="fs-14 fw-600 pb-12 pr-16 text-uppercase mb-12 d-flex align-items-flex-end justify-content-space-between"
                style={{ borderBottom: "2px solid #ddd", height: 50 }}
              >
                <span>SẢN PHẨM</span>
                <span>GIÁ</span>
              </div>
              {listProduct.map(i => (
                <div
                  className="d-flex align-items-flex-end justify-content-space-between pt-12 pb-6 pr-12"
                  style={{
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <div className="d-flex align-items-flex-end">
                    <Image
                      src={i?.anh}
                      width={50}
                      alt={i.ten_san_pham}
                      preview={false}
                    />
                    <div>
                      <div
                        style={{ color: "var(--color-brown-dark)" }}
                        className="fw-600 fs-13"
                      >
                        {i.ten_san_pham}
                      </div>
                      <div
                        className="fs-11 mt-4"
                        style={{ color: "var(--color-yellow)" }}
                      >
                        {i?.size}, <span className="fs-13">x{i.so_luong}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="fw-600"
                    style={{
                      color: "var(--color-yellow)",
                    }}
                  >
                    {formatMoneyVND(i.so_luong * i.gia_ban)}
                  </div>
                </div>
              ))}
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
                  {formatMoneyVND(totalMoney)}
                </div>
              </div>
            </div>
            <Radio.Group
              onChange={e => setTypePay(e.target.value)}
              value={typePay}
              className="radio-user mb-12"
            >
              <Radio value={1}>Thanh toán khi nhận hàng</Radio>
              <Radio value={2}>Thanh toán trực tuyến</Radio>
            </Radio.Group>
            <Button
              btnType="orange"
              className="w-100 d-flex align-items-center"
              onClick={handleOrder}
            >
              ĐẶT HÀNG
            </Button>
          </Col>
        </Row>
      </InfoOrderStyle>
      {openModalAddress && (
        <ModalSelectAddress
          open={openModalAddress}
          onCancel={() => {
            setOpenModalAddress(false)
          }}
          handleOk={() => getListAddress()}
          userInfo={userInfo}
          setAddressSelect={setAddressSelect}
          addressSelect={addressSelect}
        />
      )}
    </Spin>
  )
}

export default InfoOrder
