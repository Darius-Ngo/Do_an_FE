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
const ProductPage = React.lazy(() => import("src/pages/ANONYMOUS/ProductPage"))
const ProductDetail = React.lazy(() =>
  import("src/pages/ANONYMOUS/ProductDetail"),
)
const PostPage = React.lazy(() => import("src/pages/ANONYMOUS/PostPage"))
const NewsDetail = React.lazy(() => import("src/pages/ANONYMOUS/NewsDetail"))
const ContactSupport = React.lazy(() => import("src/pages/ANONYMOUS/Contact"))
const AboutUsPage = React.lazy(() => import("src/pages/ANONYMOUS/AboutUsPage"))

// USER
const PrivateRoutes = React.lazy(() => import("src/pages/PrivateRoutes"))
const CartPage = React.lazy(() => import("src/pages/USER/CartPage"))
const ListOrdered = React.lazy(() => import("src/pages/USER/ListOrdered"))
const MyRequest = React.lazy(() => import("src/pages/USER/MyRequest"))

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
const OrderManager = React.lazy(() => import("src/pages/ADMIN/OrderManager"))
const PostManager = React.lazy(() => import("src/pages/ADMIN/PostManager"))
const TagsManager = React.lazy(() => import("src/pages/ADMIN/TagsManager"))
const RequestSupport = React.lazy(() =>
  import("src/pages/ADMIN/RequestSupport"),
)
const Statistic = React.lazy(() => import("src/pages/ADMIN/Statistic"))

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
      {
        path: ROUTER.QUAN_LY_DON_HANG,
        element: (
          <LazyLoadingComponent>
            <OrderManager />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.QUAN_LY_BAI_VIET,
        element: (
          <LazyLoadingComponent>
            <PostManager />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.DANH_SACH_THE,
        element: (
          <LazyLoadingComponent>
            <TagsManager />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.YEU_CAU_HO_TRO,
        element: (
          <LazyLoadingComponent>
            <RequestSupport />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.THONG_KE,
        element: (
          <LazyLoadingComponent>
            <Statistic />
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
      {
        path: ROUTER.CHI_TIET_GIO_HANG,
        element: (
          <LazyLoadingComponent>
            <CartPage />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.DS_DON_DAT_HANG,
        element: (
          <LazyLoadingComponent>
            <ListOrdered />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.QL_YCHT,
        element: (
          <LazyLoadingComponent>
            <MyRequest />
          </LazyLoadingComponent>
        ),
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
        path: ROUTER.DANH_SACH_SAN_PHAM,
        element: (
          <LazyLoadingComponent>
            <ProductPage />
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
      {
        path: ROUTER.TIN_TUC,
        element: (
          <LazyLoadingComponent>
            <PostPage />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.CHI_TIET_TIN_TUC,
        element: (
          <LazyLoadingComponent>
            <NewsDetail />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.HO_TRO,
        element: (
          <LazyLoadingComponent>
            <ContactSupport />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.GIOI_THIEU,
        element: (
          <LazyLoadingComponent>
            <AboutUsPage />
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
