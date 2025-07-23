import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  candy_count: 999,
  charactor_img_link: "",
  cheat_blanket: 999,
  nick_name: "nobody",
  system_preference_color_mode: "dark",
  user_id: "",
  purchase_challenge:[1,2,3]
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      if (!action.payload) {
        // 如果 payload 為 null 或 undefined，重置為初始狀態
        state.candy_count = 999;
        state.charactor_img_link = "";
        state.cheat_blanket = 999;
        state.nick_name = "nobody";
        state.system_preference_color_mode = "dark";
        state.user_id = "";
        state.purchase_challenge=[]
        return;
      }
      state.candy_count = action.payload.candy_count;
      state.charactor_img_link = action.payload.charactor_img_link;
      state.cheat_blanket = action.payload.cheat_blanket;
      state.nick_name = action.payload.nick_name;
      state.system_preference_color_mode =
        action.payload.system_preference_color_mode;
      state.user_id = action.payload.user_id;
      state.purchase_challenge = action.payload.purchase_challenge;
    },
  },
});

export const { setAccount } = accountSlice.actions;
export default accountSlice.reducer;
