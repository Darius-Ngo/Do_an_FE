import { Image } from "antd"
import CustomModal from "src/components/Modal/CustomModal"

const ModalViewImg = ({ open, onCancel }) => {
  return (
    <CustomModal
      title={false}
      open={!!open}
      footer={false}
      onCancel={onCancel}
      width={700}
    >
      <div className=" fs-20 mb-16 title-type-1">{`Chứng từ thanh toán đơn hàng ${open?.ma_don_hang}`}</div>
      <div className="d-flex justify-content-center">
        <Image.PreviewGroup items={open.chung_tu_tt}>
          {open.chung_tu_tt?.map((i, idx) => (
            <Image
              style={{ height: "80vh", width: "auto" }}
              src={`${process.env.REACT_APP_API_ROOT}/${i}`}
            />
          ))}
        </Image.PreviewGroup>
      </div>
    </CustomModal>
  )
}

export default ModalViewImg
