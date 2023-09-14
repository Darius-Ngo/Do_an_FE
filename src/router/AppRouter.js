import { Spin } from "antd"
import React from "react"
import { useRoutes } from "react-router-dom"
import ROUTER from "./index"
// ANONYMOUS
const PublicRouters = React.lazy(() => import("src/pages/PublicRouters"))
const SvgViewer = React.lazy(() => import("src/pages/SvgViewer"))
const NotFound = React.lazy(() => import("src/pages/NotFound"))
const Home = React.lazy(() => import("src/pages/ANONYMOUS/Home"))
const LoginPage = React.lazy(() => import("src/pages/ANONYMOUS/LoginPage"))
const RegisterPage = React.lazy(() => import("src/pages/ANONYMOUS/Register"))
const MenuPage = React.lazy(() => import("src/pages/ANONYMOUS/MenuPage"))
const ProductDetail = React.lazy(() =>
  import("src/pages/ANONYMOUS/ProductDetail"),
)

// USER
const PrivateRoutes = React.lazy(() => import("src/pages/PrivateRoutes"))

// ADMIN
const AminRoutes = React.lazy(() => import("src/pages/ADMIN/AminRoutes"))
const EmployeeManager = React.lazy(() =>
  import("src/pages/ADMIN/EmployeeManager"),
)
const CustomerManager = React.lazy(() =>
  import("src/pages/ADMIN/CustomerManager"),
)
const ProductManager = React.lazy(() =>
  import("src/pages/ADMIN/ProductManager"),
)
const CategoryManager = React.lazy(() =>
  import("src/pages/ADMIN/CategoryManager"),
)

function LazyLoadingComponent({ children }) {
  return (
    <React.Suspense
      fallback={
        <div className="loading-center" style={{ height: "100vh" }}>
          <Spin />
        </div>
      }
    >
      {children}
    </React.Suspense>
  )
}

const routes = [
  {
    path: ROUTER.SVG_VIEWER,
    element: (
      <LazyLoadingComponent>
        <SvgViewer />
      </LazyLoadingComponent>
    ),
  },
  // ADMIN
  {
    element: (
      <LazyLoadingComponent>
        <AminRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: ROUTER.QUAN_LY_NHAN_VIEN,
        element: (
          <LazyLoadingComponent>
            <EmployeeManager />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.QUAN_LY_KHACH_HANG,
        element: (
          <LazyLoadingComponent>
            <CustomerManager />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.QUAN_LY_DANH_MUC,
        element: (
          <LazyLoadingComponent>
            <CategoryManager />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.QUAN_LY_SAN_PHAM,
        element: (
          <LazyLoadingComponent>
            <ProductManager />
          </LazyLoadingComponent>
        ),
      },
    ],
  },

  //  USER
  {
    element: (
      <LazyLoadingComponent>
        <PrivateRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: ROUTER.DOI_MAT_KHAU,
        element: <LazyLoadingComponent></LazyLoadingComponent>,
      },
    ],
  },

  //  ANONYMOUS
  {
    element: (
      <LazyLoadingComponent>
        <PublicRouters />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: ROUTER.HOME,
        element: (
          <LazyLoadingComponent>
            <Home />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.DANG_NHAP,
        element: (
          <LazyLoadingComponent>
            <LoginPage />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.DANG_KY,
        element: (
          <LazyLoadingComponent>
            <RegisterPage />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.THUC_DON,
        element: (
          <LazyLoadingComponent>
            <MenuPage />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.CHI_TIET_SAN_PHAM,
        element: (
          <LazyLoadingComponent>
            <ProductDetail />
          </LazyLoadingComponent>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <LazyLoadingComponent>
        <NotFound />
      </LazyLoadingComponent>
    ),
  },
]
const AppRouter = () => {
  const renderRouter = useRoutes(routes)
  return renderRouter
}
export default AppRouter
