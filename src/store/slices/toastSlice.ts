import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  content: "",
  type: "default",
  imgUrl: "",
  time: 3000,
};

export const toastSlice = createSlice({
  name: "popouts",
  initialState,
  reducers: {
    setToast: (state, action) => {
      if (state.isOpen) return
      state.isOpen = !state.isOpen;
      state.content = action.payload.content;
      state.type = action.payload.type;
      state.imgUrl = action.payload.imgUrl;
    },
    resetToast: (state) => {
      state.isOpen = false;
      state.content = "";
      state.type = "default";
      state.imgUrl = "";
    },
  },
});

export const { setToast, resetToast } = toastSlice.actions;
export default toastSlice.reducer;
