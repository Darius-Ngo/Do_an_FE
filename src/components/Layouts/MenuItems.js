import ROUTER from "src/router"
import SvgIcon from "../SvgIcon"
const MenuItemBreadcrumb = () => {
  return [
    // {
    //   label: "Đăng nhập",
    //   key: ROUTER.DANG_NHAP,
    // },
    // {
    //   label: "Đăng ký",
    //   key: ROUTER.DANG_KY,
    // },
    // {
    //   label: "Đổi mật khẩu",
    //   key: ROUTER.DOI_MAT_KHAU,
    // },
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
      children: [
        {
          label: "Chi tiết tin tức",
          key: ROUTER.CHI_TIET_TIN_TUC,
        },
      ],
    },
    {
      label: "Yêu cầu hỗ trợ",
      key: ROUTER.HO_TRO,
    },
    {
      label: "Giới thiệu",
      key: ROUTER.GIOI_THIEU,
    },
    {
      label: "Danh sách yêu cầu hỗ trợ",
      key: ROUTER.QL_YCHT,
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
      label: "Thống kê",
      key: ROUTER.THONG_KE,
      icon: <SvgIcon name="chart-line" />,
      TabID: [1],
    },
    {
      label: "Quản lý đơn hàng",
      key: ROUTER.QUAN_LY_DON_HANG,
      icon: <SvgIcon name="report" />,
      TabID: [1],
    },
    {
      label: "Quản lý tài khoản",
      key: "subkey1",
      icon: <SvgIcon name="people" />,
      TabID: [],
      children: [
        {
          key: ROUTER.QUAN_LY_NHAN_VIEN,
          label: "Tài khoản nhân viên",
          TabID: [],
        },
        {
          key: ROUTER.QUAN_LY_KHACH_HANG,
          label: "Tài khoản khách hàng",
          TabID: [],
        },
      ],
    },
    {
      label: "Quản lý sản phẩm",
      key: "subkey2",
      icon: <SvgIcon name="dashboard" />,
      TabID: [],
      children: [
        {
          label: "Danh sách danh mục",
          key: ROUTER.QUAN_LY_DANH_MUC,
          TabID: [],
        },
        {
          label: "Danh sách sản phẩm",
          key: ROUTER.QUAN_LY_SAN_PHAM,
          TabID: [],
        },
      ],
    },
    {
      label: "Quản lý tin tức",
      key: "subkey3",
      icon: <SvgIcon name="post-card" />,
      TabID: [],
      children: [
        {
          key: ROUTER.QUAN_LY_BAI_VIET,
          label: "Danh sách bài viết",
          TabID: [],
        },
        {
          key: ROUTER.DANH_SACH_THE,
          label: "Danh sách thẻ",
          TabID: [],
        },
      ],
    },
    {
      label: "Xử lý yêu cầu hỗ trợ",
      key: ROUTER.YEU_CAU_HO_TRO,
      icon: <SvgIcon name="headphone" />,
      TabID: [],
    },
    // {
    //   label: "Quản lý nhân viên",
    //   key: ROUTER.QUAN_LY_NHAN_VIEN,
    //   icon: <SvgIcon name="user-representative" />,
    //   TabID: [],
    // },
    // {
    //   label: "Quản lý người dùng",
    //   key: ROUTER.QUAN_LY_KHACH_HANG,
    //   icon: <SvgIcon name="user-single" />,
    //   TabID: [1],
    // },
    // {
    //   label: "Quản lý danh mục",
    //   key: ROUTER.QUAN_LY_DANH_MUC,
    //   icon: <SvgIcon name="report" />,
    //   TabID: [],
    // },
    // {
    //   label: "Quản lý sản phẩm",
    //   key: ROUTER.QUAN_LY_SAN_PHAM,
    //   icon: <SvgIcon name="report" />,
    //   TabID: [1],
    // },
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
