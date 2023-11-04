import ROUTER from "src/router"
import SvgIcon from "../SvgIcon"
const MenuItemBreadcrumb = () => {
  return [
    {
      label: "Đăng nhập",
      key: ROUTER.DANG_NHAP,
    },
    {
      label: "Đăng ký",
      key: ROUTER.DANG_KY,
    },
    {
      label: "Đổi mật khẩu",
      key: ROUTER.DOI_MAT_KHAU,
    },
    {
      label: "Thực đơn",
      key: ROUTER.THUC_DON,
    },
    {
      label: "Chi tiết sản phẩm",
      key: ROUTER.CHI_TIET_SAN_PHAM,
    },
    {
      label: "Chi tiết giỏ hàng",
      key: ROUTER.CHI_TIET_GIO_HANG,
    },
    {
      label: "Danh sách đơn hàng",
      key: ROUTER.DS_DON_DAT_HANG,
    },
    {
      label: "Tin tức",
      key: ROUTER.TIN_TUC,
    },
  ]
}

export default MenuItemBreadcrumb

export const MenuItemAdmin = () => {
  return [
    {
      key: ROUTER.HOME,
      label: "Trang chủ",
      icon: <SvgIcon name="home" />,
      TabID: [],
    },
    {
      label: "Quản lý nhân viên",
      key: ROUTER.QUAN_LY_NHAN_VIEN,
      icon: <SvgIcon name="report" />,
      TabID: [1],
    },
    {
      label: "Quản lý người dùng",
      key: ROUTER.QUAN_LY_KHACH_HANG,
      icon: <SvgIcon name="report" />,
      TabID: [1],
    },
    {
      label: "Quản lý danh mục",
      key: ROUTER.QUAN_LY_DANH_MUC,
      icon: <SvgIcon name="report" />,
      TabID: [1],
    },
    {
      label: "Quản lý sản phẩm",
      key: ROUTER.QUAN_LY_SAN_PHAM,
      icon: <SvgIcon name="report" />,
      TabID: [1],
    },
    {
      label: "Quản lý đơn hàng",
      key: ROUTER.QUAN_LY_DON_HANG,
      icon: <SvgIcon name="report" />,
      TabID: [1],
    },
    {
      label: "Quản lý bài viết",
      key: ROUTER.QUAN_LY_BAI_VIET,
      icon: <SvgIcon name="report" />,
      TabID: [1],
    },
    {
      label: "Thống kê",
      key: ROUTER.THONG_KE,
      icon: <SvgIcon name="report" />,
      TabID: [1],
    },
  ]
}

export const MenuHeader = () => {
  return [
    {
      label: "Trang chủ",
      key: ROUTER.HOME,
      // icon: <SvgIcon name="home" />,
    },
    {
      label: "Thực đơn",
      key: ROUTER.THUC_DON,
      // icon: <SvgIcon name="home" />,
    },
    {
      label: "Tin tức",
      key: ROUTER.TIN_TUC,
      // icon: <SvgIcon name="home" />,
    },
    {
      label: "Giới thiệu",
      key: ROUTER.GIOI_THIEU,
      // icon: <SvgIcon name="home" />,
    },
    {
      label: "Hỗ trợ",
      key: ROUTER.HO_TRO,
      // icon: <SvgIcon name="home" />,
    },
  ]
}
