// InvoiceComponent.js
import React from "react"
import { PAYMENT_TYPE } from "src/constants/constants"
import { formatMoneyVND } from "src/lib/utils"
import Logo from "src/assets/images/logo/logo-wellcome.png"
import styled from "styled-components"
const Styles = styled.div`
  width: 400px;
  padding: 30px 20px 40px;
`

const InvoiceComponent = React.forwardRef(({ data }, ref) => {
  return (
    <Styles ref={ref}>
      <div className="fs-20 fw-600 text-center mb-8">
        <img src={Logo} alt="" width={40} /> TIỆM CAFE BẤT ỔN
      </div>
      <div className="mb-8">ĐC: Số 52 Triều Khúc, Thanh Xuân, Hà Nội</div>
      <div className="mb-8">ĐT: 0358.102.912</div>
      <hr style={{ borderTop: "0.1px dashed #777" }} />
      <div className="fs-16 mb-12 mt-8">
        ĐƠN HÀNG: <span>{data?.ma_don_hang}</span>
      </div>
      <div className="mb-8">
        Người nhận: <span>{data?.ten_nguoi_nhan}</span>
      </div>
      <div className="mb-8">
        Số điện thoại: <span>{data?.sdt_nguoi_nhan}</span>
      </div>
      <div className="mb-8">
        Địa chỉ: <span>{data?.dia_chi_nhan_hang}</span>
      </div>
      <hr style={{ borderTop: "0.1px dashed #777" }} />
      {data?.ds_san_pham?.map((i, idx) => (
        <div key={idx}>
          <div className="d-flex align-items-flex-end justify-content-space-between">
            <div>
              <div className="fs-13 ">{i?.ten_san_pham}</div>
              <div className="fs-11">
                {i?.ten_kich_co} x {i?.so_luong}
              </div>
            </div>
            <div className="fs-13">
              {formatMoneyVND(i?.gia_ban * i?.so_luong)}
            </div>
          </div>
          <hr style={{ borderTop: "0.1px dotted #e5e5e5" }} />
        </div>
      ))}
      <div className="d-flex align-items-flex-end justify-content-space-between">
        <div className="fs-13 ">Tổng tạm tính:</div>
        <div className=" fs-13">{formatMoneyVND(data?.tong_tien)}</div>
      </div>
      <div className="d-flex align-items-flex-end justify-content-space-between mt-6 mb-6">
        <div className="fs-13 ">Thuế:</div>
        <div className=" fs-13">{formatMoneyVND(0)}</div>
      </div>
      <div className="d-flex align-items-flex-end justify-content-space-between mt-6 mb-6">
        <div className="fs-13 ">Phương thức thanh toán:</div>
        <div className=" fs-13">{PAYMENT_TYPE[data?.kieu_thanh_toan]}</div>
      </div>
      <div className="d-flex align-items-flex-end justify-content-space-between mt-16">
        <div className="fs-15 fw-600">TỔNG CỘNG: </div>
        <div className="fw-600 fs-15">
          {formatMoneyVND(data?.kieu_thanh_toan === 1 ? data?.tong_tien : 0)}
        </div>
      </div>
    </Styles>
  )
})

export default InvoiceComponent
