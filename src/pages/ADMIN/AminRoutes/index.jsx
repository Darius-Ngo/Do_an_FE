import { Button, Result } from "antd"
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom"
import MainLayout from "src/components/Layouts"
import { ROLE_ADMIN, ROLE_ID } from "src/constants/constants"
import STORAGE, { getStorage } from "src/lib/storage"
import ROUTER from "src/router"

function AdminRoutes() {
  const isLogin = getStorage(STORAGE.TOKEN)
  const user = getStorage(STORAGE.USER_INFO)
  const location = useLocation()

  return !!isLogin ? (
    ROLE_ADMIN.includes(user?.id_phan_quyen) ? (
      <MainLayout isAdmin={true}>
        <Outlet />
      </MainLayout>
    ) : (
      <Result
        status="403"
        title="403 Erorr Permission"
        subTitle="Xin lỗi, Bạn không có quyền truy cập trang web."
        extra={
          <NavLink to="/">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button type="primary" className="btn-hover-shadow">
                Quay lại trang chủ
              </Button>
            </div>
          </NavLink>
        }
      />
    )
  ) : (
    <Navigate to={ROUTER.HOME} />
  )
}

export default AdminRoutes
