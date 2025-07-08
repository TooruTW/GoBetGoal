import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  width: 0,
};

export const screenSizeSlice = createSlice({
  name: "screenSize",
  initialState,
  reducers: {
    setScreenSize: (state, action) => {
      state.width = action.payload.width;
    },
  },
});

export const { setScreenSize } = screenSizeSlice.actions;
export default screenSizeSlice.reducer;
