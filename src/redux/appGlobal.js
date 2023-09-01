import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  listTabs: [],
  isAuthenticated: false,
  userInfo: {},
}

export const appGlobalSlice = createSlice({
  name: "appGlobal",
  initialState,
  reducers: {
    setListTabs: (state, action) => {
      state.listTabs = action.payload
    },
    changeAuthorization: (state, action) => {
      state.isAuthenticated = action.payload
    },
  
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
  },
})

export const {
  changeAuthorization,
  setListTabs,
  setUserInfo,
} = appGlobalSlice.actions

export default appGlobalSlice.reducer
