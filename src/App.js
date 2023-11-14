import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import STORAGE, { getStorage } from "src/lib/storage"
import SpinCustom from "./components/Spin"
import { setListCart, setUserInfo } from "./redux/appGlobal"
import AppRouter from "./router/AppRouter"
import CartService from "./services/CartService"
import "./App.scss"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)
function App() {
  const isLogin = getStorage(STORAGE.TOKEN)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const getListCart = async id_nguoi_dung => {
    try {
      setLoading(true)
      const res = await CartService.getListCart({ id_nguoi_dung })
      if (res.isError) return
      dispatch(setListCart(res.Object))
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!!isLogin) {
      const user = getStorage(STORAGE.USER_INFO)
      dispatch(setUserInfo(user))
      getListCart(user.id)
    }
  }, [isLogin])

  return (
    <div className="layout-center">
      <div className="layout-max-width">
        {loading ? (
          <div className="loading-center" style={{ height: "100vh" }}>
            <SpinCustom />
          </div>
        ) : (
          <AppRouter />
        )}
      </div>
    </div>
  )
}

export default App
