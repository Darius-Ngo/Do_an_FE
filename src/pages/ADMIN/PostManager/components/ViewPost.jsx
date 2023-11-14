import { useEffect, useState } from "react"
import LayoutCommon from "src/components/Common/Layout"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import { NewsDetailStyled } from "src/pages/ANONYMOUS/NewsDetail/styled"
import PostService from "src/services/PostService"

const ViewPost = ({ open, onCancel, setBtn }) => {
  const [loading, setLoading] = useState(false)
  const [detail, setDetail] = useState({})

  useEffect(() => {
    getDetailPost()
  }, [open])

  const getDetailPost = async () => {
    try {
      setLoading(true)
      const res = await PostService.getDetailPost({ id_bai_viet: open.id })
      if (res?.isError) return

      setDetail(res?.Object)
    } finally {
      setLoading(false)
    }
  }

  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end">
      {setBtn()?.map(
        i =>
          i.enable && (
            <Button btnType={i?.btnType} loading={loading} onClick={i?.onClick}>
              {i?.title}
            </Button>
          ),
      )}
    </div>
  )
  return (
    <CustomModal
      title={"Xem bài viết"}
      footer={renderFooter()}
      width={1300}
      open={!!open}
      onCancel={onCancel}
    >
      <LayoutCommon>
        <NewsDetailStyled>
          <div
            style={{ overflowX: "hidden" }}
            dangerouslySetInnerHTML={{ __html: detail?.noi_dung }}
          />
        </NewsDetailStyled>
      </LayoutCommon>
    </CustomModal>
  )
}

export default ViewPost
