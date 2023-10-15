import { Col, Divider, Image, Rate, Row, Skeleton, Upload } from "antd"
import { useEffect, useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"

import Button from "src/components/MyButton/Button"
import SpinCustom from "src/components/Spin"
import SvgIcon from "src/components/SvgIcon"
import { FAILBACK } from "src/constants/constants"
import { getBase64 } from "src/lib/utils"

import ReactPlayer from "react-player"
import CustomModal from "src/components/Modal/CustomModal"
import { ButtonUploadStyle, RateStyled } from "../styled"
import FileService from "src/services/FileService"
import ProductService from "src/services/ProductService"
import Notice from "src/components/Notice"

const FileUpload = ({ file, onDelete }) => {
  const [base64, setBase64] = useState()
  useEffect(() => {
    getImageBase64(file)
  }, [file])

  const getImageBase64 = async file => {
    const res = file?.type?.includes("video")
      ? URL.createObjectURL(file)
      : await getBase64(file)
    setBase64(res)
  }

  return (
    <Col className="image-item">
      <div className="image-css">
        {!base64 ? (
          <Skeleton.Image active={true} />
        ) : file?.type?.includes("video") ? (
          <ReactPlayer
            url={base64}
            width="100px"
            height="100px"
            playing={false}
            controls={true}
          />
        ) : (
          <Image
            width={100}
            src={base64}
            alt="Giấy phép"
            fallback={FAILBACK}
            placeholder={<Skeleton.Image width={100} active={true} />}
          />
        )}
      </div>
      <Row className="align-items-center justify-content-space-between mt-8">
        <span
          title={file?.name}
          className="text-ellipsis"
          style={{ maxWidth: 70 }}
        >
          {file?.name}
        </span>
        <div className="pointer" onClick={onDelete}>
          <SvgIcon name="bin" />
        </div>
      </Row>
    </Col>
  )
}
const ModalRate = ({ visible, listProduct, onCancel, onOk = () => {} }) => {
  const [loading, setLoading] = useState(false)
  const [listPro, setListPro] = useState([])

  useEffect(() => {
    if (listProduct) setListPro(listProduct)
  }, [listProduct])

  const handleChangeReview = (value, ProductID) =>
    setListPro(
      listPro.map(i => {
        if (i.ProductID === ProductID) {
          return {
            ...i,
            ...value,
          }
        } else return i
      }),
    )

  const deleteMedia = item =>
    setListPro(
      listPro.map(i => {
        const newList = i?.FileList?.filter(x => x.uid !== item.uid)
        return {
          ...i,
          FileList: newList,
        }
      }),
    )

  const onRate = async () => {
    try {
      setLoading(true)
      const listToApi = await Promise.all(
        listPro?.map(async item => {
          let res
          if (item?.FileList?.length) {
            const formData = new FormData()
            item?.FileList.map(img => formData.append("InsertFileList", img))
            res = await FileService.uploadFileList(formData)
          }
          if (res?.isError) return
          return {
            ProductID: item?.ProductID,
            StarRating: item?.Rating,
            ContentRating: item?.Comment,
            ListObjectFileID: res?.Object.map(i => i.ObjectFileID),
          }
        }),
      )
      ProductService.insertReviewPro(listToApi).then(res => {
        if (res.isOk) {
          onCancel()
          onOk()
          Notice({
            msg: "Đánh giá thành công",
            isSuccess: true,
          })
        }
      })
    } finally {
      setLoading(false)
    }
  }
  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end">
      <Button btnType="linear" className="btn-linear-2" onClick={onRate}>
        Ghi lại
      </Button>
    </div>
  )

  return (
    <CustomModal
      title={`Đánh giá`}
      open={!!visible}
      onCancel={onCancel}
      footer={renderFooter()}
      width={800}
    >
      <SpinCustom spinning={loading}>
        {listPro.map((i, idx) => {
          return (
            <RateStyled key={i.ProductID}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <img
                    alt=""
                    src={i?.Image}
                    width="60px"
                    style={{ marginRight: "10px" }}
                  />
                </div>
                <div className="fw-600">{i?.ProductName}</div>
              </div>
              <div className="rate">
                <Rate
                  value={i?.Rating}
                  onChange={e =>
                    handleChangeReview({ Rating: e }, i?.ProductID)
                  }
                />
              </div>
              <FlInput
                placeholder="Nhập đánh giá"
                textArea
                value={i?.Comment}
                onChange={e =>
                  handleChangeReview({ Comment: e?.target.value }, i?.ProductID)
                }
                style={{ height: 150, maxHeight: 150 }}
              />

              <Row className="mt-16">
                <ButtonUploadStyle>
                  <Button className="account-button-upload ">
                    <Upload
                      multiple
                      beforeUpload={(_, list) => {
                        handleChangeReview(
                          { FileList: [...list, ...i.FileList] },
                          i?.ProductID,
                        )
                        return false
                      }}
                      accept=".png, .jpeg, .jpg, .bmp"
                      fileList={[]}
                    >
                      <Row className="account-background-upload d-flex align-items-center">
                        <SvgIcon name="small-image-red" />
                        <div className="account-text-upload ml-16">
                          Thêm ảnh
                        </div>
                      </Row>
                    </Upload>
                  </Button>
                </ButtonUploadStyle>
                {!i?.FileList?.find(file => file?.type?.includes("video")) && (
                  <ButtonUploadStyle className="ml-10">
                    <Button className="account-button-upload ">
                      <Upload
                        multiple={false}
                        beforeUpload={(_, list) => {
                          handleChangeReview(
                            { FileList: [...list, ...i.FileList] },
                            i?.ProductID,
                          )
                          return false
                        }}
                        accept="video/mp4,video/x-m4v,video/*"
                        fileList={[]}
                      >
                        <Row className="account-background-upload d-flex align-items-center">
                          <SvgIcon name="add-media-video" />
                          <div className="account-text-upload ml-16">
                            Thêm video
                          </div>
                        </Row>
                      </Upload>
                    </Button>
                  </ButtonUploadStyle>
                )}
              </Row>
              <Row
                gutter={24}
                style={{
                  flexWrap: "nowrap",
                  overflow: "auto",
                  marginTop: 10,
                  paddingBottom: 10,
                }}
              >
                <Image.PreviewGroup>
                  {i?.FileList?.map((i, idx) => (
                    <FileUpload
                      key={`${i?.uid}_${idx}`}
                      file={i}
                      onDelete={() => deleteMedia(i)}
                    />
                  ))}
                </Image.PreviewGroup>
              </Row>
              {idx !== listPro.length - 1 && <Divider />}
            </RateStyled>
          )
        })}
      </SpinCustom>
    </CustomModal>
  )
}

export default ModalRate
