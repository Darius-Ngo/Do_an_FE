import { Col, Row } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";

const OrderItem = (props) => {
  const dispatch = useDispatch();
  const { item } = props;
  return (
    <div className="order-item">
      <Row>
        <Col span={3}>
          <div className="product-size product-item__content">
            {item.maDonHang}
          </div>
        </Col>
        <Col span={4}>
          <div className="product-size product-item__content">
            {moment(new Date(item.thoiGianDat)).format("HH:MM - DD/MM/YYYY")}
          </div>
        </Col>
        <Col span={4}>
          <div className="product-price product-item__content">
            {item.trangThaiStr}
          </div>
        </Col>
        <Col span={10}>
          <div className=" product-item__content">{item.diaChiGiaoHang}</div>
        </Col>
        <Col span={3}>
          <div className="sum-price product-item__content">
            {item.tongTien.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderItem;
