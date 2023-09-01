import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  banner: [],
  event: [],
  footer: {},
}

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setBanner: (state, action) => {
      state.banner = action.payload
    },
    setFooter: (state, action) => {
      state.footer = action.payload
    },
    setEvent: (state, action) => {
      state.event = action.payload
    },
  },
})

export const { setEvent, setBanner, setFooter } = bannerSlice.actions

export default bannerSlice.reducer
