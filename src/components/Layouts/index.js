import { Avatar, Col, Drawer, Dropdown, Input, Layout, Menu, Row } from "antd"
import React, { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import STORAGE, { clearStorage, getStorage, setStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import UseWindowSize from "src/lib/useWindowSize"
import { hasPermission } from "src/lib/utils"
import ModalChangeInfo from "src/pages/USER/MyAccount/components/ModalChangeInfo"
import { setUserInfo } from "src/redux/appGlobal"
import ROUTER from "src/router"
import AuthService from "src/services/AuthService"
import LayoutCommon from "../Common/Layout"
import LayoutAdminCommon from "../Common/LayoutAdmin"
import SvgIcon from "../SvgIcon"
import MenuItemBreadcrumb, { MenuItemAdmin } from "./MenuItems"
import LayoutAdmin from "./component/LayoutAdmin"
import LayoutUser from "./component/LayoutUser"
import LoginModal from "./component/LoginModal"
import Notification from "./component/Notification"
import RegisterModal from "./component/RegisterModal"
import { LayoutStyled, MenuSelect, StyleMenuAccount } from "./styled"
import "./styles.scss"
import { routeNav } from "src/pages/USER/Declaration/component/routeNav"
import { setOpenLoginModal } from "src/redux/loginModal"
import { ACCOUNT_TYPE_ADMIN } from "src/constants/constants"

const { Header, Content } = Layout

const MainLayout = ({ children, isAdmin }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { openLoginModal } = useSelector(state => state.loginModal)
  const { listTabs, userInfo } = useSelector(state => state?.appGlobal)
  const isLogin = getStorage(STORAGE.TOKEN)
  let isUser = location.pathname.includes(ROUTER.DICH_VU)
  const [open, setOpen] = useState(false)
  const [selectedKey, setSelectedKey] = useState(
    getStorage(STORAGE.KEY_MENU_ACTIVE) || ["/"],
  )
  const [openUserInfor, setOpenUserInfor] = useState(false)
  const { isNotificationUpdate } = useContext(StoreContext)
  const [isModelNotification, setIsModelNotification] = isNotificationUpdate
  const [menuAdmin, setMenuAdmin] = useState([])
  const [openRegisterModal, setOpenRegisterModal] = useState(false)
  const { listDossier } = useSelector(state => state.dossier)
  const [listTypeForm, setListTypeForm] = useState([])
  useEffect(() => {
    setListTypeForm(listDossier)
  }, [listDossier])

  const onClickMenu = key => {
    if (isModelNotification) {
      setIsModelNotification(false)
    }
    setStorage(STORAGE.KEY_MENU_ACTIVE, key.keyPath)
    setSelectedKey(key.key.keyPath)
    if (!key.key.includes("subkey")) navigate(key.key)
  }
  const handleLogout = async () => {
    if (isLogin) {
      await AuthService.logout()
      clearStorage()
      dispatch(setUserInfo({}))
      return navigate(ROUTER?.HOME)
    }
  }
  const filterMenu = data =>
    data?.filter(o => {
      if (o?.children) {
        if (filterMenu(o?.children)?.length)
          o.children = filterMenu(o?.children)
        else delete o?.children
      }
      return !o?.hideOnMenu
    })

  const menuAccount = (
    <StyleMenuAccount>
      <div className="menu-account">
        <Menu className="dropdown-option">
          <div className="account-infor">
            {!!ACCOUNT_TYPE_ADMIN?.includes(userInfo?.AccountType) ? (
              <>
                <Menu.Item
                  key="1"
                  onClick={() => {
                    let startPage = undefined
                    if (!!menuAdmin && !!menuAdmin[0]) {
                      startPage =
                        menuAdmin[0]?.children?.[0]?.key || menuAdmin[0]?.key
                    } else if (!!(menuAdmin[0]?.key?.charAt(0) === "/")) {
                      startPage = menuAdmin[0]?.key
                    }
                    navigate(!!menuAdmin?.length ? startPage : ROUTER.HOME)
                  }}
                >
                  <div className="btn-function strok-btn-function">
                    <SvgIcon name="user-info" />
                    <span className="fw-400">Quản trị hệ thống</span>
                  </div>
                </Menu.Item>
                {!!(userInfo?.AccountType === 9) && (
                  <Menu.Item
                    key="2"
                    onClick={() => {
                      navigate(ROUTER.HO_SO_CHO_XU_LY)
                    }}
                  >
                    <div className="btn-function strok-btn-function">
                      <SvgIcon name="user-setting" />
                      <span className="fw-400">Dịch vụ</span>
                    </div>
                  </Menu.Item>
                )}
              </>
            ) : (
              <Menu.Item
                key="2"
                onClick={() => {
                  navigate(ROUTER.HO_SO_CHO_XU_LY)
                }}
              >
                <div className="btn-function strok-btn-function">
                  <SvgIcon name="user-setting" />
                  <span className="fw-400">Dịch vụ</span>
                </div>
              </Menu.Item>
            )}
            <Menu.Item
              key="3"
              onClick={() => {
                navigate(ROUTER.THONG_TIN_TAI_KHOAN)
              }}
            >
              <div className="btn-function strok-btn-function">
                <SvgIcon name="user-info" />
                <span className="fw-400">Thông tin tài khoản</span>
              </div>
            </Menu.Item>
            <Menu.Item
              key="4"
              onClick={() => {
                navigate(ROUTER.DOI_MAT_KHAU)
              }}
            >
              <div className="btn-function strok-btn-function">
                <SvgIcon name="reset-pass" />
                <span className="fw-400">Đổi mật khẩu</span>
              </div>
            </Menu.Item>
            <Menu.Item
              key="5"
              style={{ color: "#ED1117" }}
              onClick={handleLogout}
            >
              <div className="btn-logout">
                <SvgIcon name="logoutIcon" />
                Đăng xuất
              </div>
            </Menu.Item>
          </div>
        </Menu>
      </div>
    </StyleMenuAccount>
  )

  const setShowListMenu = list =>
    !!list?.length
      ? list
          ?.filter(x => hasPermission(x?.TabID, [...listTabs]))
          .map(i => ({
            ...i,
            children: setShowListMenu(i?.children),
          }))
      : undefined

  useEffect(() => {
    let key = location?.pathname
    setSelectedKey([key])
  }, [location])

  useEffect(() => {
    if (!!isLogin) {
      const menu = setShowListMenu(MenuItemAdmin())
      setMenuAdmin(menu)
    }
  }, [userInfo, listTabs])

  return (
    <LayoutStyled>
      <Header className={`header-background`}>
        <div className="d-flex-start">
          <div className="w-100">
            {React.createElement(isAdmin ? LayoutAdminCommon : LayoutCommon, {
              children: (
                <Row
                  gutter={36}
                  className=" pt-5 pb-5 d-flex align-items-center justify-content-space-between"
                  style={{
                    margin: "auto",
                  }}
                >
                  <Col
                    className={`d-flex-center justify-content-flex-start nowrap`}
                    style={{
                      whiteSpace: "nowrap",
                      height: "40px",
                      paddingLeft: 0,
                      flex: 1,
                      width: 0,
                    }}
                    flex={"auto"}
                  >
                    <div
                      className={"mr-40"}
                      onClick={() => {
                        navigate(ROUTER.HOME)
                      }}
                    >
                      <span
                        className={`fw-600 d-flex-center h-100pe ${
                          UseWindowSize.isMobile() ? "fs-12" : "fs-20"
                        }`}
                      >
                        {/* <img src={Logo} className="logo" alt="logo" /> */}
                        <div className="logo-text text-uppercase pointer">
                          Cục sở hữu trí tuệ
                        </div>
                      </span>
                    </div>
                    {/* <CustomMenuStyled>
                      <Menu
                        onClick={key => onClickMenu(key)}
                        selectedKeys={selectedKey}
                        mode="horizontal"
                        items={
                          isLogin
                            ? setShowListMenu(MenuItem())
                            : MenuItem().filter(i => i.publishRouter)
                        }
                      />
                    </CustomMenuStyled> */}
                    <Dropdown
                      placement="bottomLeft"
                      overlay={
                        <MenuSelect triggerSubMenuAction="click">
                          <div className="search-input">
                            <Input
                              placeholder="Gõ tên thủ tục"
                              onChange={e => {
                                if (e.target.value) {
                                  setListTypeForm(
                                    listDossier.filter(i =>
                                      i.name
                                        .toLowerCase()
                                        .includes(e.target.value.toLowerCase()),
                                    ),
                                  )
                                } else setListTypeForm(listDossier)
                              }}
                            />
                          </div>
                          {listTypeForm.map((item, idx) => (
                            <Menu.Item
                              key={idx}
                              onClick={() => {
                                if (isLogin) {
                                  navigate(item.Router)
                                } else {
                                  dispatch(setOpenLoginModal(true))
                                }
                              }}
                            >
                              <div
                                className={`max-line1 `}
                                style={
                                  location.pathname === item.Router
                                    ? { color: "blue" }
                                    : {}
                                }
                                title={`${item.Number}. ${item.name}`}
                              >
                                {item.Number}. {item.name}
                              </div>
                            </Menu.Item>
                          ))}
                        </MenuSelect>
                      }
                    >
                      <div style={{ cursor: "pointer" }}>
                        <SvgIcon name="plus-circle-white" />
                      </div>
                    </Dropdown>
                  </Col>
                  <Col style={{ width: "auto" }}>
                    <Row
                      gutter={30}
                      className="align-items-center layout-action"
                    >
                      {!!isLogin ? (
                        <div className="d-flex justify-content-flex-end align-items-center">
                          <Notification />
                          <Dropdown
                            overlay={menuAccount}
                            overlayStyle={{ minWidth: "200px" }}
                          >
                            <Row gutter={5} className="pointer ">
                              <Col>
                                <div className="account-infor-avatar">
                                  <Avatar
                                    src={userInfo?.Avatar}
                                    size={32}
                                    className="style-avt mr-8"
                                    icon={
                                      <div>
                                        <SvgIcon name="user-header" />
                                      </div>
                                    }
                                  />
                                  <span className="mr-8 max-line1">
                                    {userInfo?.FullName}
                                  </span>
                                  <SvgIcon name="arrow-down-primary" />
                                </div>
                              </Col>
                            </Row>
                          </Dropdown>
                        </div>
                      ) : (
                        <div className="d-flex align-items-center h-100 ">
                          <Row
                            // onClick={() => navigate(ROUTER.DANG_NHAP)}
                            onClick={() => dispatch(setOpenLoginModal(true))}
                            className="align-items-center pointer login-item"
                          >
                            {/* <SvgIcon
                                name="user_login"
                                className="login-icon"
                              /> */}
                            <span className="login-item_text">Đăng nhập</span>
                          </Row>
                          <Row
                            // onClick={() => navigate(ROUTER.DANG_KY)}
                            onClick={() => setOpenRegisterModal(true)}
                            className="align-items-center pointer login-item"
                          >
                            {/* <SvgIcon
                                name="register"
                                className="register-icon"
                              /> */}
                            <span className="login-item_text">Đăng ký</span>
                          </Row>
                        </div>
                      )}
                    </Row>
                  </Col>
                </Row>
              ),
            })}
          </div>
        </div>
      </Header>
      {/* <BreadcrumbHome /> */}
      <Layout>
        <Content className="site-layout-background">
          {isAdmin ? (
            <>
              <LayoutAdmin
                children={children}
                menuAdmin={menuAdmin}
                selectedKey={selectedKey}
              />
            </>
          ) : isUser ? (
            <LayoutUser
              children={children}
              selectedKey={selectedKey}
              userInfo={userInfo}
            />
          ) : (
            <>
              <div className="w-100 body-cl">{children}</div>
            </>
          )}
          {/* {!isAdmin && !isUser && <Footer />} */}
        </Content>
      </Layout>
      <Drawer
        title=""
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
        className="menu-custom"
      >
        <Menu
          onClick={key => onClickMenu(key)}
          selectedKeys={selectedKey}
          mode="inline"
          items={filterMenu(MenuItemBreadcrumb())}
        />
      </Drawer>
      {/* {!!openForgetPassModal && (
        <ForgetModal
          openForgetPassModal={openForgetPassModal}
          handleOk={() => {}}
          handleCancel={() => setOpenForgetPassModal(false)}
          handleLogin={() => navigate(ROUTER.DANG_NHAP)}
          setOpenVerifyModal={() => setOpenVerifyModal(true)}
          setEmail={setEmail}
        />
      )}
      {!!openVerifyModal && (
        <VerifyForgetModal
          openVerifyModal={openVerifyModal}
          handleOk={() => {}}
          handleCancel={() => setOpenVerifyModal(false)}
          handleLogin={() => navigate(ROUTER.DANG_NHAP)}
          setRePasswordModal={() => setRePasswordModal(true)}
          email={email}
          setCodeVerify={setCodeVerify}
        />
      )} */}
      {!!openLoginModal && (
        <LoginModal
          openLoginModal={openLoginModal}
          handleCancel={() => dispatch(setOpenLoginModal(false))}
          handleRegister={() => setOpenRegisterModal(true)}
          // setOpenForgetPassModal={() => setOpenForgetPassModal(true)}
        />
      )}
      {!!openRegisterModal && (
        <RegisterModal
          open={openRegisterModal}
          handleCancel={() => setOpenRegisterModal(false)}
          handleLogin={() => dispatch(setOpenLoginModal(true))}
        />
      )}
      {!!openUserInfor && (
        <>
          <ModalChangeInfo
            open={openUserInfor}
            userInfo={userInfo}
            onCancel={() => setOpenUserInfor(false)}
            onOk={() => {}}
          />
        </>
      )}
    </LayoutStyled>
  )
}

export default MainLayout
