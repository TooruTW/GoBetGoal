import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showBuyCheat: false,
};

export const screenSizeSlice = createSlice({
  name: "popouts",
  initialState,
  reducers: {
    setShowBuyCheat: (state) => {
      state.showBuyCheat = !state.showBuyCheat;
    },
  },
});

export const { setShowBuyCheat } = screenSizeSlice.actions;
export default screenSizeSlice.reducer;
