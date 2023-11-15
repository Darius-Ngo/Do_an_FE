import { Checkbox, Col, Divider, Form, Row } from "antd"
import { useContext, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import FlInput from "src/components/FloatingLabel/Input"
import Button from "src/components/MyButton/Button"
import STORAGE, { getStorage, setStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import { setListCart, setUserInfo } from "src/redux/appGlobal"
import AuthService from "src/services/AuthService"
import CartService from "src/services/CartService"
import bgr_login from "src/assets/images/login/login-1.jpg"
import { ModalLoginStyle, StyleLoginModal } from "./styled"
import SvgIcon from "src/components/SvgIcon"

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

  // const comeStartPage = async () => {
  //   const resp = await RoleService.getListTab()
  //   if (resp.isError) return
  //   dispatch(setListTabs(resp.Object))
  //   const menuAdmin = MenuItemAdmin()
  //     ?.filter(x => hasPermission(x?.TabID, [...resp.Object]))
  //     .map(i => ({
  //       ...i,
  //       children: i?.children?.filter(x =>
  //         hasPermission(x?.TabID, [...resp.Object]),
  //       ),
  //     }))
  //   let startPage = "/"
  //   if (!!menuAdmin && !!menuAdmin[0]) {
  //     startPage = menuAdmin[0]?.children?.[0]?.key || menuAdmin[0]?.key
  //   } else if (!!(menuAdmin[0]?.key?.charAt(0) === "/")) {
  //     startPage = menuAdmin[0]?.key
  //   }
  //   navigate(startPage)
  // }
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
      setStorage(STORAGE.TOKEN, res?.Object?.token)
      setStorage(STORAGE.USER_INFO, res?.Object)
      dispatch(setUserInfo(res?.Object))
      getListCart(res?.Object.id)
      setRouterBeforeLogin(undefined)
      handleCancel()
      if (stopNavigate) return
      else {
        // navigate(
        //   routerBeforeLogin
        //     ? routerBeforeLogin
        //     : ACCOUNT_TYPE_ADMIN?.includes(res?.Object?.id_phan_quyen)
        //     ? comeStartPage()
        //     : ROUTER.TO_KHAI_MOI,
        // )
        if (routerBeforeLogin) navigate(routerBeforeLogin)
        // if (ACCOUNT_TYPE_KH?.includes(res?.Object?.id_phan_quyen)) {
        //   dispatch(setIsUser(true))
        // }
        // if (ACCOUNT_TYPE_DAI_DIEN?.includes(res?.Object?.id_phan_quyen)) {
        //   dispatch(setIsRepresentative(true))
        // }
        // if (ACCOUNT_TYPE_ADMIN?.includes(res?.Object?.id_phan_quyen)) {
        //   // comeStartPage()
        //   navigate(ROUTER.HO_SO_TRUC_TUYEN)
        //   dispatch(setIsAdmin(true))
        // } else {
        //   navigate(ROUTER.HO_SO_CHO_XU_LY)
        // }
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
      const res = await AuthService.loginFB()
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
