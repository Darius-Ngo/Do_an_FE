import {
  Modal,
  Button,
  Form,
  Col,
  Row,
  Select,
  Input,
  Spin,
  message,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getRegexMobile} from '../../../../../common/regexCommon';
import {
  getXaPhuongStart,
  getQuanHuyenStart,
  getTinhThanhStart,
} from "../../../../redux";
import "./styles.scss";

const ModalSelectLocal = (props) => {
  const { visible, onCancel } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {
    status,
    data: { listTinhThanh, listQuanHuyen, listXaPhuong },
  } = useSelector((state) => state.userPage);
  const [tinhThanh, setTinhThanh] = useState();
  const [quanHuyen, setQuanHuyen] = useState();
  const [xaPhuong, setXaPhuong] = useState();

  useEffect(() => {
    dispatch(getTinhThanhStart());
  }, []);

  const SelectTinh = (matp) => {
    form.setFieldsValue({
      quanHuyen: "",
      xaPhuong: "",
    });
    dispatch(getQuanHuyenStart(matp));
    const tinhThanh = listTinhThanh.filter((item) => item.matp === matp);
    setTinhThanh(tinhThanh[0].name);
  };
  const SelectHuyen = (maqh) => {
    form.setFieldsValue({
      xaPhuong: "",
    });
    dispatch(getXaPhuongStart(maqh));
    const QuanHuyen = listQuanHuyen.filter((item) => item.maqh === maqh);
    setQuanHuyen(QuanHuyen[0].name);
  };
  const SelectXa = (maxp) => {
    const XaPhuong = listXaPhuong.filter((item) => item.maxp === maxp);
    setXaPhuong(XaPhuong[0].name);
  };

  const handleSubmit = () => {
    form.validateFields().then(() => {
      const value = form.getFieldsValue(true);
      const diaChi =
        `${value.thongTinThem}, ${xaPhuong}, ${quanHuyen}, ${tinhThanh}`.toString();
      localStorage.setItem("diaChi", diaChi);
      localStorage.setItem("info", JSON.stringify(value));
      handleCancel();
      message.success("Đã lưu thông tin đặt hàng.");
    });
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      title="Thông tin nhận hàng"
      visible={visible}
      onCancel={onCancel}
      width={700}
      className={`wrap-modal-user ${props.className ? props.className : ""}`}
      destroyOnClose
      footer={[
        <div key="footer" className="d-flex justify-content-end">
          <Button
            color="primary"
            className="modal-btn btn-cancel"
            key="back"
            onClick={handleCancel}
          >
            Đóng
          </Button>
          <Button
            color="primary"
            className="modal-btn btn-submit"
            key="submit"
            onClick={handleSubmit}
          >
            <SaveOutlined />
            Ghi nhận
          </Button>
        </div>,
      ]}
    >
      <Spin spinning={status === "loading"}>
        <div className="wrap-modal-selectLocal">
          <Form
            form={form}
            layout="vertical"
            className="form-content"
            initialValues={{}}
          >
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  label="Họ tên người nhận"
                  name="tenNguoiNhan"
                  rules={[{ required: true, message: "Nhập họ tên!" }]}
                >
                  <Input
                    className="input-item"
                    allowClear
                    placeholder="họ tên"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="SĐT người nhận "
                  name="sdtNguoiNhan"
                  rules={[
                    { required: true, message: "Nhập số điện thoại!" },
                    {
                      pattern: getRegexMobile(),
                      message: "Số điện thoại không đúng!",
                    },
                  ]}
                >
                  <Input className="input-item" placeholder="số điện thoại" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={8}>
                <Form.Item
                  label="Tỉnh/thành"
                  name="tinhThanh"
                  rules={[{ required: true, message: "Chọn tỉnh thành!" }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="chọn tỉnh"
                    onSelect={SelectTinh}
                  >
                    {listTinhThanh?.map((item, i) => (
                      <Select.Option value={item.matp} key={i}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Quận/huyện"
                  name="quanHuyen"
                  rules={[{ required: true, message: "Chọn quận huyện!" }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="chọn huyện"
                    onSelect={SelectHuyen}
                  >
                    {listQuanHuyen?.map((item, i) => (
                      <Select.Option value={item.maqh} key={i}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Xã/phường"
                  name="xaPhuong"
                  rules={[{ required: true, message: "Chọn xã phương!" }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="chọn xã"
                    onSelect={SelectXa}
                  >
                    {listXaPhuong?.map((item, i) => (
                      <Select.Option value={item.maxp} key={i}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Số nhà" name="thongTinThem">
              <Input className="input-item" allowClear placeholder="số nhà" />
            </Form.Item>
            <Form.Item label="Ghi chú" name="ghiChu">
              <Input.TextArea
                className="input-item"
                allowClear
                placeholder="ghi chú"
                style={{ height: 120 }}
              />
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </Modal>
  );
};

export default ModalSelectLocal;
