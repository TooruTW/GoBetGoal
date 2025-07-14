import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    candy_count: 999,
    charactor_img_link: "string",
    cheat_blanket: 999,
    nick_name: "nobody",
    system_preference_color_mode: "dark",
    user_id: "string",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.candy_count = action.payload.candy_count;
      state.charactor_img_link = action.payload.charactor_img_link;
      state.cheat_blanket = action.payload.cheat_blanket;
      state.nick_name = action.payload.nick_name;
      state.system_preference_color_mode = action.payload.system_preference_color_mode;
      state.user_id = action.payload.user_id;
    },
  },
});

export const { setAccount } = accountSlice.actions;
export default accountSlice.reducer;
