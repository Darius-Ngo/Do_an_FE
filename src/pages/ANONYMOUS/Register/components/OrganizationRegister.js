import { Checkbox, Col, Form, Upload } from "antd"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import FlInput from "src/components/FloatingLabel/Input"
import SelectAddress from "src/components/SelectAddress"
import SvgIcon from "src/components/SvgIcon"
import {
  getRegexEmail,
  getRegexMobile,
  regexIDCard,
} from "src/lib/stringsUtils"
import { normFile } from "src/lib/utils"

const OrganizationRegister = ({
  form,
  acceptRules,
  setAcceptRules,
  setLoading,
}) => {
  return (
    <>
      <Col span={24}>
        <div className="fs-16 fw-600 mb-12">I. Thông tin chung về tổ chức</div>
      </Col>
      <Col xs={24} md={24}>
        <Form.Item
          name="Email"
          rules={[
            { required: true, message: "Thông tin không được để trống" },
            {
              pattern: getRegexEmail(),
              message: "Email sai định dạng",
            },
          ]}
        >
          <FlInput label="Email " isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={24}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập trường này!",
            },
          ]}
          name="CompanyName"
        >
          <FlInput label="Tên cơ quan" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item
          name="PhoneNumber"
          rules={[
            { required: true, message: "Thông tin không được để trống" },
            {
              pattern: getRegexMobile(),
              message: "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
            },
          ]}
        >
          <FlInput label="Số điện thoại" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item name="Fax">
          <FlInput label="FAX" />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item name="Website">
          <FlInput label="Website" />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item
          name="BusinessLicenseCode"
          rules={[{ required: true, message: "Thông tin không được để trống" }]}
        >
          <FlInput label="Mã số GPKD/GCNKD" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item
          name="IssuedBy"
          rules={[{ required: true, message: "Thông tin không được để trống" }]}
        >
          <FlInput label="Nơi cấp" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item
          name="IssueDate"
          rules={[{ required: true, message: "Thông tin không được để trống" }]}
        >
          <FlDatePicker label="Ngày cấp" isRequired />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          valuePropName="fileList"
          name="file"
          getValueFromEvent={normFile}
        >
          <Upload.Dragger
            multiple={true}
            beforeUpload={() => false}
            className="pointer"
          >
            <div className="d-flex justify-content-flex-start">
              <span className="pl-12">
                Bản quyết định thành lập/Đăng ký kinh doanh{" "}
                <span
                  className="fs-12 "
                  style={{ textDecoration: "underline", color: "#2747A0" }}
                >
                  Tải lên file
                </span>
              </span>
            </div>
          </Upload.Dragger>
        </Form.Item>
      </Col>
      <Col span={24}>
        <SelectAddress
          floating={true}
          form={form}
          required={false}
          isGuest
          setLoading={setLoading}
          listFormName={["ProvinceID", "DistrictID", "WardID"]}
        />
      </Col>
      <Col md={24}>
        <Form.Item name="Address">
          <FlInput label="Địa chỉ chi tiết" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <div className="fs-16 fw-600 mb-12">II. Thông tin người đại diện</div>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập trường này!",
            },
          ]}
          name="FullNameRepresent"
        >
          <FlInput label="Họ và tên" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập trường này!",
            },
          ]}
          name="PositionName"
        >
          <FlInput label="Chức danh" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập trường này!",
            },
            {
              pattern: regexIDCard(),
              message: "CCCD/CMT nhập sai định dạng!",
            },
          ]}
          name="CitizenID"
        >
          <FlInput label="CCCD/CMT/Hộ chiếu" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập trường này!",
            },
          ]}
          name="IssuedByRepresent"
        >
          <FlInput label="Nơi cấp" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item
          name="IssueDateRepresent"
          rules={[{ required: true, message: "Thông tin không được để trống" }]}
        >
          <FlDatePicker label="Ngày cấp" isRequired />
        </Form.Item>
      </Col>
      <Col md={24}>
        <Form.Item name="AddressRepresent">
          <FlInput label="Địa chỉ hiện tại" />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item name="acceptRules" valuePropName="checked">
          <Checkbox
            checked={acceptRules}
            value={acceptRules}
            onChange={value => setAcceptRules(value.target.checked)}
          >
            Đồng ý với{" "}
            <span style={{ textDecoration: "underline", color: "#5D5FEF" }}>
              điều khoản & chính sách
            </span>
          </Checkbox>
        </Form.Item>
      </Col>
      <Col md={7}>
        <Form.Item name="CaptCha">
          <FlInput label="Mã captcha" />
        </Form.Item>
      </Col>
      <Col
        md={4}
        className="d-flex align-items-center justify-content-flex-start"
        style={{ height: "fit-content" }}
      >
        <SvgIcon name="refresh-black" className="ml-12" />
      </Col>
    </>
  )
}

export default OrganizationRegister
