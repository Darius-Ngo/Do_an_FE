import { Spin } from "antd"
import LoadingOverlay from "src/components/LoadingOverlay"
import Logo from "src/assets/images/logo/logo-wellcome.png"

export default function SpinCustom(props) {
  const { className } = props

  const spinIcon = (
    <div>
      <img src={Logo} className="logo" alt="logo" />
      <LoadingOverlay isLoadingTable sizeSmall />
    </div>
  )

  return <Spin {...props} className={className} indicator={spinIcon} />
}
