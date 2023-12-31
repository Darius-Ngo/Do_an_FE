import { useLayoutEffect, useState } from "react"

const UseWindowSize = (width, isLess = false) => {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      const currentWidth = isLess
        ? global.window.innerWidth < width
        : global.window.innerWidth > width
      setSize(currentWidth)
    }
    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [isLess, width])
  return size
}

const isLaptop = () => UseWindowSize(1507, true)

const isDesktop = () => UseWindowSize(1200)

const isTablet = () => UseWindowSize(991, true)

const isMobile = () => UseWindowSize(768, true)
const windowSize = { isLaptop, isDesktop, isMobile, isTablet }

export default windowSize
