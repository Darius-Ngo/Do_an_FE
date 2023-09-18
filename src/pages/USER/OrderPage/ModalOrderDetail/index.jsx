import { Button, Spin, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import confirm from "antd/lib/modal/confirm";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "./styles.scss";
import { huyDonHangStart } from "../../../redux";
import Modal from "../../../../../components/Modal";

const ModalOrderDetail = (props) => {
  const dispatch = useDispatch();
  const { visible, orderDetail, onCancel } = props;

  console.log("orderDetail", orderDetail);

  const columns = [
    {
      title: "STT",
      render: (record) => (
        <div className="text-center">
          {orderDetail?.chiTietDonHangResponseList?.indexOf(record) + 1 || ""}
        </div>
      ),
      key: "id",
      width: "5%",
    },
    {
      title: "Tên sản phẩm",
      key: "tenSanPham",
      align: "center",
      width: 200,
      render: (record) => <div>{record?.sanPham?.tenSanPham}</div>,
    },
    {
      title: "Kích cỡ",
      dataIndex: "kichCo",
      key: "kichCo",
      align: "center",
      width: 120,
    },
    {
      title: "Giá bán",
      dataIndex: "giaBan",
      key: "giaBan",
      align: "center",
      width: 200,
      render: (record) => (
        <div>
          {record?.toLocaleString("vi", { style: "currency", currency: "VND" })}
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "center",
      width: 120,
    },
    {
      title: "Tổng giá sản phẩm",
      key: "tongGia",
      align: "center",
      width: 240,
      render: (record) => (
        <div>
          {record?.giaBan * record?.soLuong
            ? (record?.giaBan * record?.soLuong).toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })
            : ""}
        </div>
      ),
    },
  ];

  const confirmChangeStatus = () => {
    confirm({
      title: "Hủy đơn hàng",
      icon: <DeleteOutlined color="red" />,
      width: "600px",
      content: (
        <div>
          Bạn có chắc chắn muốn hủy đơn hàng mã
          <strong> {orderDetail?.maDonHang} </strong>
          không?
        </div>
      ),
      okText: "Đồng ý",
      cancelText: "Đóng",
      onOk() {
        dispatch(huyDonHangStart(orderDetail.id));
        onCancel();
      },
      onCancel() {},
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      className={`wrap-modal-user ${props.className ? props.className : ""}`}
      key={orderDetail?.maDonHang}
      title={
        orderDetail
          ? `Đơn hàng mã ${orderDetail?.maDonHang}`
          : "Chi tiết đơn hàng"
      }
      width={900}
      footer={
        <div key="footer" className="btns-footer">
          {orderDetail?.trangThai === 1 ? (
            <Button
              key="submit2"
              className="modal-btn btn-submit"
              onClick={confirmChangeStatus}
            >
              Hủy đơn
            </Button>
          ) : (
            <div></div>
          )}
          <Button
            key="back"
            onClick={onCancel}
            className="modal-btn btn-submit"
          >
            Đóng
          </Button>
        </div>
      }
    >
      <Spin spinning={false}>
        <div className="wrap-content-order">
          <div className="title text-center">THÔNG TIN ĐƠN HÀNG</div>
          <div className="content-info">
            <div className="info-row">
              <div className="info-item">
                <span className="info-title">Người nhận: </span>
                <span className="info-content">
                  {orderDetail?.tenNguoiNhan}
                </span>
              </div>
              <div className="info-item">
                <span className="info-title">Số điện thoại người nhận: </span>
                <span className="info-content">
                  {orderDetail?.sdtNguoiNhan}
                </span>
              </div>
            </div>
            <div className="info-row">
              <div className="info-item">
                <span className="info-title">Thời gian đặt hàng: </span>
                <span className="info-content">
                  {moment(new Date(orderDetail?.thoiGianDat)).format(
                    "DD/MM/YYYY"
                  )}
                </span>
              </div>
              <div className="info-item">
                <span className="info-title">Ghi chú: </span>
                <span className="info-content">{orderDetail?.ghiChu}</span>
              </div>
            </div>
            <div className="info-item">
              <span className="info-title">Địa chỉ giao hàng: </span>
              <span className="info-content">
                {orderDetail?.diaChiGiaoHang}
              </span>
            </div>
          </div>
          <div className="title">Danh sách sản phẩm: </div>
          <Table
            columns={columns}
            bordered
            rowKey="id"
            pagination={false}
            dataSource={orderDetail?.chiTietDonHangResponseList?.concat(
              (() => {
                let tongGia = 0;
                for (let row of orderDetail?.chiTietDonHangResponseList) {
                  tongGia += row["soLuong"] * row["giaBan"];
                }
                return {
                  id: "total",
                  key: "total",
                  name: "Total (by Column)",
                  giaBan: "Tổng giá sản phẩm: ",
                  soLuong: tongGia?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  }),
                };
              })()
            )}
          />
          <div className="info-row" style={{ marginTop: "10px" }}>
            <div className="info-item">
              <span className="info-title">Phí ship toàn quốc: </span>
              <span className="info-title">
                {(30000).toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <div className="info-item" style={{ textAlign: "right" }}>
              <span className="info-title">Tổng thanh toán: </span>
              <span className="info-title">
                {orderDetail?.tongTien?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default ModalOrderDetail;
