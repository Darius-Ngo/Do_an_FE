import { Col, Image, Row } from "antd"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import {
  COLOR_STATUS,
  FAILBACK,
  GENDER_LIST,
  ROLE_LIST,
  STATUS_ACTIVE,
} from "src/constants/constants"
import styled from "styled-components"
import dayjs from "dayjs"
const Styled = styled.div``
const ModalDetailUser = ({ open, onCancel, setBtns }) => {
  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end">
      {setBtns()?.map(
        i =>
          i?.enable && (
            <Button btnType={i?.btnType} onClick={i?.onClick}>
              {i?.title}
            </Button>
          ),
      )}
    </div>
  )
  return (
    <CustomModal
      title={"Thông tin chi tiết"}
      footer={renderFooter()}
      width={1000}
      open={open}
      onCancel={onCancel}
    >
      <Styled>
        <Row gutter={16}>
          <Col span={9}>
            <Image src={open?.avatar} fallback={FAILBACK} width={"100%"} />
          </Col>
          <Col span={15}>
            <Row gutter={[16, 24]} className="">
              <Col span={24}>
                <div className="d-flex align-items-center justify-content-center fs-22">
                  <div className="fw-600">Tài khoản:</div>
                  <div className="ml-8">{open?.username}</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="d-flex align-items-center justify-content-flex-start fs-16">
                  <div className="fw-600">Phân quyền:</div>
                  <div className="ml-8">
                    {ROLE_LIST.find(i => i.value === open?.id_phan_quyen).label}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="d-flex align-items-center justify-content-flex-start fs-16">
                  <div className="fw-600">Trạng thái:</div>
                  <div
                    className="ml-8"
                    style={{ color: COLOR_STATUS[open?.trang_thai] }}
                  >
                    {
                      STATUS_ACTIVE.find(i => i.value === open?.trang_thai)
                        .label
                    }
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="d-flex align-items-center justify-content-flex-start fs-16">
                  <div className="fw-600">Tên nhân viên:</div>
                  <div className="ml-8">{open?.ho_ten}</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="d-flex align-items-center justify-content-flex-start fs-16">
                  <div className="fw-600">Số CCCD:</div>
                  <div className="ml-8">{open?.cccd}</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="d-flex align-items-center justify-content-flex-start fs-16">
                  <div className="fw-600">Giới tính:</div>
                  <div className="ml-8">
                    {GENDER_LIST.find(i => i.value === open?.gioi_tinh).label}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="d-flex align-items-center justify-content-flex-start fs-16">
                  <div className="fw-600">Ngày sinh:</div>
                  <div className="ml-8">
                    {open?.ngay_sinh
                      ? dayjs(open?.ngay_sinh).format("DD/MM/YYYY")
                      : ""}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="d-flex align-items-center justify-content-flex-start fs-16">
                  <div className="fw-600">Số điện thoại:</div>
                  <div className="ml-8">{open?.sdt}</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="d-flex align-items-center justify-content-flex-start fs-16">
                  <div className="fw-600">Email:</div>
                  <div className="ml-8">{open?.email}</div>
                </div>
              </Col>
              <Col span={24}>
                <div className="d-flex align-items-flex-start justify-content-flex-start fs-16">
                  <div className="fw-600" style={{ whiteSpace: "nowrap" }}>
                    Địa chỉ:
                  </div>
                  <div className="ml-8">{open?.dia_chi}</div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Styled>
    </CustomModal>
  )
}

export default ModalDetailUser
