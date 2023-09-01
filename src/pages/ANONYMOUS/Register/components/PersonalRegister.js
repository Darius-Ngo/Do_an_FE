import { Checkbox, Col, Form, Select } from "antd"
import { useSelector } from "react-redux"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import SelectOneProvince from "src/components/SelectAddress/SelectOneProvince"
import { getRegexMobile, regexIDCard } from "src/lib/stringsUtils"

const PersonRegister = ({ form, acceptRules, setAcceptRules, setLoading }) => {
  const { listSystemKey } = useSelector(state => state.appGlobal)

  return (
    <>
      {/* <Col span={24}>
        <div className="fs-16 fw-600 mb-12">Thông tin tài khoản</div>
      </Col> */}
      <Col xs={24} md={12}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Họ và tên không được để trống!",
            },
          ]}
          name="FullName"
        >
          <FlInput label="Họ và tên" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="PhoneNumber"
          rules={[
            { required: true, message: "Số điện thoại không được để trống" },
            {
              pattern: getRegexMobile(),
              message: "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
            },
          ]}
        >
          <FlInput label="Số điện thoại" isRequired />
        </Form.Item>
      </Col>
      <Col md={12} xs={24}>
        <Form.Item name="Birthday">
          <FlDatePicker label="Ngày sinh" />
        </Form.Item>
      </Col>
      <Col md={12} xs={24}>
        <Form.Item name="Sex">
          <FlSelect label="Giới tính" allowClear>
            <Select.Option key={1} value={1}>
              Nam
            </Select.Option>
            <Select.Option key={2} value={2}>
              Nữ
            </Select.Option>
          </FlSelect>
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item
          name="CitizenID"
          rules={[
            {
              required: true,
              message: "CCCD/CMT/Hộ chiếu không được để trống!",
            },
            {
              pattern: regexIDCard(),
              message: "CCCD/CMT nhập sai định dạng!",
            },
          ]}
        >
          <FlInput label="CCCD/CMT/Hộ chiếu" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item
          name="IssuedBy"
          // rules={[{ required: true, message: "Thông tin không được để trống" }]}
        >
          <FlInput label="Nơi cấp" />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item
          name="IssueDate"
          // rules={[{ required: true, message: "Thông tin không được để trống" }]}
        >
          <FlDatePicker label="Ngày cấp" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <SelectOneProvince
          floating={true}
          form={form}
          required
          isGuest
          listFormName={["ProvinceID", "DistrictID", "WardID"]}
          setLoading={setLoading}
        />
      </Col>
      <Col md={24}>
        <Form.Item
          name="Address"
          rules={[
            {
              required: true,
              message: "Địa chỉ chi tiết không được để trống!",
            },
          ]}
        >
          <FlInput label="Địa chỉ chi tiết" isRequired />
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
      {/* <Col md={7}>
        <Form.Item name="CaptCha">
          <FlInput label="Mã Captcha" />
        </Form.Item>
      </Col>
      <Col
        md={4}
        className="d-flex align-items-center justify-content-flex-start"
        style={{ height: "fit-content" }}
      >
        <img src={captcha} alt="captcha" width={120} />
        <SvgIcon name="refresh-black" className="ml-12" />
      </Col> */}
    </>
  )
}

export default PersonRegister
