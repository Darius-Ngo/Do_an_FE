import ROUTER from "src/router"
import SvgIcon from "../SvgIcon"
const MenuItemBreadcrumb = () => {
  return [
    {
      label: "Đăng nhập",
      key: ROUTER?.DANG_NHAP,
    },
    {
      label: "Đăng ký",
      key: ROUTER?.DANG_KY,
    },
    {
      label: "Đổi mật khẩu",
      key: ROUTER?.DOI_MAT_KHAU,
    },
  ]
}

export default MenuItemBreadcrumb

export const MenuItemAdmin = () => {
  return [
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
  ]
}
