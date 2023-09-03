import { Checkbox, Col, Form, Input, Row } from "antd"
import { useContext, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Button from "src/components/MyButton/Button"
import STORAGE, { getStorage, setStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import { setUserInfo } from "src/redux/appGlobal"
import ROUTER from "src/router"
import AuthService from "src/services/AuthService"
import { StyleLoginPage } from "./styled"

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { routerStore } = useContext(StoreContext)
  const [routerBeforeLogin, setRouterBeforeLogin] = routerStore
  const onLogin = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await AuthService.login({ ...values })
      if (res?.isError) return
      setStorage(STORAGE.REMEMBER_LOGIN, values?.remember)
      setStorage(STORAGE.TOKEN, res?.Object?.Token)
      setStorage(STORAGE.USER_INFO, res?.Object)
      dispatch(setUserInfo(res?.Object))
      setRouterBeforeLogin(undefined)
      navigate(routerBeforeLogin ? routerBeforeLogin : ROUTER.HOME)
    } finally {
      setLoading(false)
    }
  }

  return (
    <StyleLoginPage>
      <div className="content-wrap">
        <Row className="login-form" gutter={16}>
          <Col span={14} className="border-right-form">
            <div className="d-flex flex-column align-items-center justify-content-center">
              {/* <img src={logo} alt="" width={90} /> */}
              <div className="fs-26 fw-600 title-form mt-16">
                Tiệm cà phê bất ổn
              </div>
              {/* <img src={pana} alt="" width={"60%"} /> */}
            </div>
          </Col>
          <Col span={10}>
            <div className="d-flex flex-column justify-content-center h-100">
              <div className="text-center mb-30">
                <div className="fs-28 fw-600 title-form">Đăng nhập</div>
              </div>
              <div className="pl-20 pr-20">
                <Form form={form} layout="vertical">
                  <Form.Item
                    label="Tài khoản"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống!",
                      },
                    ]}
                    name="Username"
                  >
                    <Input placeholder="Nhập tài khoản" />
                  </Form.Item>
                  <Form.Item
                    label="Mật khẩu"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập mật khẩu!",
                      },
                      // {
                      //   pattern: getRegexPassword(),
                      //   message:
                      //     "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
                      // },
                    ]}
                    name="Password"
                  >
                    <Input.Password placeholder="Nhập mật khẩu" />
                  </Form.Item>
                  <Form.Item name="remember" valuePropName="checked">
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

                  {/* <Row className="d-flex justify-content-flex-end">
                  <Link
                    onClick={() => {
                      setOpenForgetPassModal()
                      handleCancel()
                    }}
                    className="forget-pass"
                  >
                    <i>Quên mật khẩu?</i>
                  </Link>
                </Row> */}
                  <Row>
                    <Button
                      loading={loading}
                      btnType="primary"
                      className="btn-login"
                      type="submit"
                      htmlType="submit"
                      onClick={onLogin}
                    >
                      Đăng nhập
                    </Button>
                  </Row>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </StyleLoginPage>
  )
}

export default LoginPage
