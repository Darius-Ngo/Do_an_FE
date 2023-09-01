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
      label: "Báo cáo",
      key: ROUTER.BAO_CAO,
      icon: <SvgIcon name="report" />,
      TabID: [1],
    },
    {
      label: "Quản lý hồ sơ",
      key: "subkey2",
      icon: <SvgIcon name="document" />,
      TabID: [1],
      children: [
        {
          label: "Hồ sơ trực tuyến",
          key: ROUTER.HO_SO_TRUC_TUYEN,
          TabID: [1],
        },
        // {
        //   label: "Hồ sơ trực tiếp",
        //   key: ROUTER.HO_SO_TRUC_TIEP,
        //   TabID: [1],
        // },
      ],
    },
    {
      label: "Yêu cầu hỗ trợ",
      key: ROUTER.YEU_CAU_HO_TRO,
      hideOnMenu: true,
      showOnAdmin: true,
      icon: <SvgIcon name="headphone" />,
      TabID: [23],
    },
    {
      label: "Duyệt đăng ký",
      key: ROUTER.DUYET_DANG_KY,
      hideOnMenu: true,
      showOnAdmin: true,
      icon: <SvgIcon name="menu-authori" />,
      TabID: [23],
    },
    {
      label: "Quản trị hệ thống",
      key: "subkey1",
      icon: <SvgIcon name="management-skdn" />,
      TabID: [18, 31, 19, 13, 14, 5],
      children: [
        {
          key: ROUTER.DANH_BA_KHACH_HANG,
          label: "Danh bạ khách hàng",
          TabID: [19],
        },
        {
          key: ROUTER.DANH_BA_NHAN_VIEN,
          label: "Danh bạ nhân viên",
          TabID: [18],
        },
        {
          key: ROUTER.DANH_SACH_CHUC_VU,
          label: "Danh sách chức vụ",
          TabID: [19],
        },
        {
          key: ROUTER.DANH_MUC_HE_THONG,
          label: "Danh mục hệ thống",
          TabID: [19],
        },
        {
          key: ROUTER.DANH_MUC_HO_SO,
          label: "Danh mục hồ sơ",
          TabID: [19],
        },
        {
          key: ROUTER.QUAN_LY_PHAN_QUYEN,
          label: "Phân quyền",
          TabID: [13],
        },
        {
          key: ROUTER.NHAT_KY_HE_THONG,
          label: "Nhật ký hệ thống",
          TabID: [14],
        },
      ],
    },
  ]
}

export const MenuItemUser = () => {
  return [
    {
      key: ROUTER.HOME,
      label: "Trang chủ",
      icon: <SvgIcon name="home" />,
      TabID: [],
    },
    {
      label: "Hồ sơ của tôi",
      key: "subkey1",
      icon: <SvgIcon name="document" />,
      TabID: [27, 28],
      children: [
        {
          label: "Chờ xử lý",
          key: ROUTER.HO_SO_CHO_XU_LY,
          TabID: [1],
        },
        {
          label: "Đang xử lý",
          key: ROUTER.HO_SO_DANG_XU_LY,
          TabID: [1],
        },
      ],
    },
    {
      key: ROUTER.QUAN_LY_TAI_KHOAN_HO_TRO,
      label: "Yêu cầu hỗ trợ",
      icon: <SvgIcon name="headphone" />,
      TabID: [],
      children: [
        {
          label: "Danh sách yêu câu hỗ trợ",
          key: ROUTER.DANH_SACH_YEU_CAU_HO_TRO,
          TabID: [1],
        },
        {
          label: "Hướng dẫn sử dụng",
          key: ROUTER.HUONG_DAN_SU_DUNG,
          TabID: [1],
        },
      ],
    },
    {
      key: ROUTER.LS_HOAT_DONG_USER,
      label: "Lịch sử hoạt động",
      icon: <SvgIcon name="history-company" />,
      TabID: [],
    },
    {
      key: ROUTER.THONG_TIN_TAI_KHOAN,
      label: "Thông tin cá nhân",
      icon: <SvgIcon name="management-skdn" />,
      TabID: [],
    },
    {
      key: ROUTER.CAU_HINH_CHU_KY,
      label: "Cấu hình chữ ký",
      icon: <SvgIcon name="config" />,
      TabID: [],
    },
  ]
}
