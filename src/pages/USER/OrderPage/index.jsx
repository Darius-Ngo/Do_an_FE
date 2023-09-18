import { Row, Col, Spin, Form, Empty, message } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import ModalOrderDetail from "./ModalOrderDetail";
import { getListDonHangStart } from "../../redux";
import "./styles.scss";
const OrderPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {
    status,
    data: { listDonHang },
  } = useSelector((state) => state.userPage);
  const User = JSON.parse(localStorage.getItem("User"));
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [orderDetail, setOrderDetail] = useState();

  useEffect(() => {
    if (User) {
      dispatch(getListDonHangStart(User.id));
    }
  }, []);

  const handleShowDetail = (item) => {
    setOrderDetail(item);
    setShowModalDetail(true);
  }

  return (
    <div className="order-page-container">
      <Spin spinning={status === "loading"}>
        <Row>
          <div className="title mb-1">DANH SÁCH ĐƠN HÀNG</div>
          <div className="cart-header">
            <Row>
              <Col md={3}>
                <div className="header-content">Mã đơn hàng</div>
              </Col>
              <Col md={4}>
                <div className="header-content">Ngày đặt đơn</div>
              </Col>
              <Col md={4}>
                <div className="header-content">Trạng thái đơn</div>
              </Col>
              <Col md={10}>
                <div className="header-content">Địa chỉ nhận</div>
              </Col>
              <Col md={3}>
                <div className="header-content">Đơn giá</div>
              </Col>
            </Row>
          </div>
          <div className="cart-content">
            <Form form={form}>
              {listDonHang.length > 0 &&
                listDonHang.map((item, i) => (
                  <div onClick={() => handleShowDetail(item)}>
                    <OrderItem item={item} key={i} />
                  </div>
                ))}
              {!listDonHang.length > 0 && (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={"Bạn không có đơn hàng nào!"}
                />
              )}
            </Form>
          </div>
        </Row>
      </Spin>
      <ModalOrderDetail
        visible={showModalDetail}
        orderDetail={orderDetail}
        onCancel={() => setShowModalDetail(false)}
      />
    </div>
  );
};

export default OrderPage;
