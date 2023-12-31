import { Checkbox, Col, Divider, Form, Row } from "antd"
import { useContext, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import FlInput from "src/components/FloatingLabel/Input"
import Button from "src/components/MyButton/Button"
import STORAGE, { getStorage, setStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import { setListCart, setListTabs, setUserInfo } from "src/redux/appGlobal"
import AuthService from "src/services/AuthService"
import CartService from "src/services/CartService"
import bgr_login from "src/assets/images/login/login-1.jpg"
import { ModalLoginStyle, StyleLoginModal } from "./styled"
import SvgIcon from "src/components/SvgIcon"
import { MenuItemAdmin } from "../../MenuItems"
import { hasPermission } from "src/lib/utils"
import { ROLE_ADMIN } from "src/constants/constants"

const LoginModal = ({
  openLoginModal,
  handleCancel,
  handleRegister,
  setOpenForgetPassModal,
  stopNavigate = false,
}) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { routerStore } = useContext(StoreContext)
  const [routerBeforeLogin, setRouterBeforeLogin] = routerStore

  const comeStartPage = async listTab => {
    const menuAdmin = MenuItemAdmin()
      ?.filter(x => hasPermission(x?.TabID, listTab))
      .map(i => ({
        ...i,
        children: i?.children?.filter(x => hasPermission(x?.TabID, listTab)),
      }))
    let startPage = "/"
    if (!!menuAdmin && !!menuAdmin[0]) {
      startPage = menuAdmin[0]?.children?.[0]?.key || menuAdmin[0]?.key
    } else if (!!(menuAdmin[0]?.key?.charAt(0) === "/")) {
      startPage = menuAdmin[0]?.key
    }
    navigate(startPage)
  }
  const getListCart = async id_nguoi_dung => {
    try {
      setLoading(true)
      const res = await CartService.getListCart({ id_nguoi_dung })
      if (res.isError) return
      dispatch(setListCart(res.Object))
    } finally {
      setLoading(false)
    }
  }
  const onLogin = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await AuthService.login({ ...values })
      if (res?.isError) return
      const body = {
        ...res?.Object,
        danh_sach_quyen: res?.Object?.danh_sach_quyen?.split(",")?.map(i => ({
          CategoryID: i,
          IsVistTab: true,
        })),
      }
      setStorage(STORAGE.TOKEN, body?.token)
      setStorage(STORAGE.USER_INFO, body)
      dispatch(setUserInfo(body))
      getListCart(body.id)
      setRouterBeforeLogin(undefined)
      dispatch(setListTabs(body?.danh_sach_quyen))
      handleCancel()
      if (stopNavigate) return
      else {
        if (routerBeforeLogin) return navigate(routerBeforeLogin)
        if (ROLE_ADMIN?.includes(body?.id_phan_quyen))
          return comeStartPage(body?.danh_sach_quyen)
      }
    } finally {
      setLoading(false)
    }
  }
  const loginGG = async () => {
    try {
      setLoading(true)
      const res = await AuthService.loginGG()
      if (res?.isError) return
      window.location.replace(res?.Object)
    } finally {
      setLoading(false)
    }
  }
  const loginFB = async () => {
    try {
      setLoading(true)
      const res = await AuthService.loginFacebook()
      if (res?.isError) return
      window.location.replace(res?.Object)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalLoginStyle
      title={false}
      width={850}
      footer={null}
      open={openLoginModal}
      onCancel={handleCancel}
      style={{ top: 20 }}
    >
      <Row>
        <Col span={10}>
          <img
            src={bgr_login}
            alt=""
            width="100%"
            style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
          />
        </Col>
        <Col span={14}>
          <StyleLoginModal>
            <div className="text-center mb-40">
              <div className="fs-22 fw-600">Chào mừng đến với chúng tôi!</div>
            </div>
            <div>
              <Form form={form} layout="vertical">
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống!",
                    },
                  ]}
                  name="username"
                >
                  <FlInput label="Tên đăng nhập" isRequired />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập mật khẩu!",
                    },
                  ]}
                  name="password"
                  className="mb-6"
                >
                  <FlInput label="Mật khẩu" isPass isRequired />
                </Form.Item>
                <Row className="d-flex justify-content-space-between align-items-center mb-6">
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    className="mb-0"
                  >
                    <Checkbox
                      onChange={val =>
                        localStorage.setItem(
                          STORAGE.REMEMBER_LOGIN,
                          JSON.stringify(val.target.checked),
                        )
                      }
                      value={getStorage(STORAGE.REMEMBER_LOGIN)}
                    >
                      Duy trì đăng nhập
                    </Checkbox>
                  </Form.Item>
                  <Link
                    onClick={() => {
                      setOpenForgetPassModal()
                      handleCancel()
                    }}
                    className="forget-pass mb-0"
                  >
                    <i>Quên mật khẩu?</i>
                  </Link>
                </Row>
                <Button
                  loading={loading}
                  btnType="orange-third"
                  className="btn-login mt-16"
                  type="submit"
                  htmlType="submit"
                  onClick={onLogin}
                >
                  Đăng nhập
                </Button>
              </Form>
              <Divider plain className="mv-12">
                Hoặc
              </Divider>
              <Row gutter={16}>
                <Col span={12}>
                  <Button className="box" onClick={loginFB} disabled={loading}>
                    <div className="d-flex align-items-center">
                      <SvgIcon name="login-facebook" />
                      <div className="ml-16 fs-16">Facebook</div>
                    </div>
                  </Button>
                </Col>
                <Col span={12}>
                  <Button className="box" onClick={loginGG} disabled={loading}>
                    <div className="d-flex align-items-center">
                      <SvgIcon name="login-google" />
                      <div className="ml-16 fs-16">Google</div>
                    </div>
                  </Button>
                </Col>
              </Row>
              <div className="mt-16 text-center">
                Bạn chưa có tài khoản?{" "}
                <i
                  style={{ color: "rgb(36 118 226)" }}
                  className="pointer"
                  onClick={() => {
                    handleCancel()
                    handleRegister()
                  }}
                >
                  Đăng ký
                </i>
              </div>
            </div>
          </StyleLoginModal>
        </Col>
      </Row>
    </ModalLoginStyle>
  )
}

export default LoginModal
