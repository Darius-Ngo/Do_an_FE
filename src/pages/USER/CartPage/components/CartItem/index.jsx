import { DeleteOutlined } from "@ant-design/icons"
import { Col, Form, InputNumber, Row, Tooltip } from "antd"
import confirm from "antd/lib/modal/confirm"
import React, { useState } from "react"
import { MdDeleteOutline } from "react-icons/md"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { getRegexNumber } from "src/lib/stringsUtils"

const CartItem = props => {
  const dispatch = useDispatch()
  const [num, setNum] = useState(1)
  const { item, Change, index } = props
  const selectNum = value => {
    setNum(value)
    Change((index + 1) * value)
  }
  const handleDelete = productData => {
    confirm({
      title: "Xoá sản phẩm ",
      icon: <DeleteOutlined color="red" />,
      width: "600px",
      content: (
        <div>
          Bạn có chắc chắn muốn xoá sản phẩm
          <strong style={{ color: "#f5222d" }}>
            {" "}
            {productData?.sanPham.tenSanPham}{" "}
          </strong>
          không?
        </div>
      ),
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk() {},
      onCancel() {},
    })
  }
  return (
    <div className="product-item">
      <Row>
        <Col md={9}>
          <Link to={"/product/" + item.id}>
            <div className="product-img-name">
              <div className="product-img">
                <img src={item.sanPham.anh} alt={item.sanPham.tenSanPham} />
              </div>
              <div className="product-name">{item.sanPham.tenSanPham}</div>
            </div>
          </Link>
        </Col>
        <Col md={3}>
          <div className="product-size product-item__content">
            {item.kichCoStr}
          </div>
        </Col>
        <Col md={3}>
          <div className="product-price product-item__content">
            {item.giaBan.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        </Col>
        <Col md={4}>
          <div className="product-num product-item__content">
            <Form.Item
              name={`soLuong${index}`}
              rules={[
                {
                  required: true,
                  message: "Nhập số lượng!",
                },
                {
                  pattern: getRegexNumber(),
                  message: "Chỉ nhập số!",
                },
              ]}
            >
              <InputNumber
                min={1}
                defaultValue={1}
                value={num}
                onChange={selectNum}
              />
            </Form.Item>
          </div>
        </Col>
        <Col md={3}>
          <strong className="sum-price product-item__content">
            <span className="sum-number">{item.giaBan * num}</span>
          </strong>
        </Col>
        <Col md={2}>
          <div
            className="product-delete product-item__content"
            onClick={() => handleDelete(item)}
          >
            <Tooltip placement="right" title="Xóa sản phẩm" color="#f5222d">
              <MdDeleteOutline />
            </Tooltip>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default CartItem
