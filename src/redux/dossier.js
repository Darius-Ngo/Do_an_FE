import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  listDossier: [],
}

export const dossierSlice = createSlice({
  name: "dossier",
  initialState,
  reducers: {
    setListDossier: (state, action) => {
      state.listDossier = action.payload
    },
  },
})

export const { setListDossier } = dossierSlice.actions

export default dossierSlice.reducer
