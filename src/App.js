import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import STORAGE, { getStorage } from "src/lib/storage"
import "./App.scss"
import ModalLoading from "./components/Modal/Loading"
import AppRouter from "./router/AppRouter"
import SpinCustom from "./components/Spin"

function App() {
  const isLogin = getStorage(STORAGE.TOKEN)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!!isLogin) {
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
