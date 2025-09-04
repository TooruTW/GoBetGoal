import { createSlice } from "@reduxjs/toolkit";
import { UserInfoSupa } from "@/types/UserInfoSupa";

const initialState: UserInfoSupa & { email: string } = {
  candy_count: 999,
  character_img_link: "",
  cheat_blanket: 999,
  nick_name: "nobody",
  system_preference_color_mode: "dark",
  user_id: "",
  purchase_challenge: [],
  purchase_avatar: [],
  total_trial_count: 0,
  trial_count: 0,
  trial_pass_count: 0,
  liked_posts_count: 0,
  friend_count: 0,
  email: "",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      if (!action.payload) {
        // 如果 payload 為 null 或 undefined，重置為初始狀態
        state.candy_count = 999;
        state.character_img_link = "";
        state.cheat_blanket = 999;
        state.nick_name = "nobody";
        state.system_preference_color_mode = "dark";
        state.user_id = "";
        state.purchase_challenge = [];
        state.purchase_avatar = [];
        state.total_trial_count = 0;
        state.trial_count = 0;
        state.trial_pass_count = 0;
        state.liked_posts_count = 0;
        state.friend_count = 0;
        state.email = "";
        return;
      }
      state.candy_count = action.payload.candy_count;
      state.character_img_link = action.payload.character_img_link;
      state.cheat_blanket = action.payload.cheat_blanket;
      state.nick_name = action.payload.nick_name;
      state.system_preference_color_mode =
        action.payload.system_preference_color_mode;
      state.user_id = action.payload.user_id;
      state.purchase_challenge = action.payload.purchase_challenge;
      state.purchase_avatar = action.payload.purchase_avatar;
      state.total_trial_count = action.payload.total_trial_count;
      state.trial_count = action.payload.trial_count;
      state.trial_pass_count = action.payload.trial_pass_count;
      state.liked_posts_count = action.payload.liked_posts_count;
      state.friend_count = action.payload.friend_count;
      state.email = action.payload.email;
    },
    setDarkMode: (state, action) => {
      state.system_preference_color_mode = action.payload;
    },
  },
});

export const { setAccount, setDarkMode } = accountSlice.actions;
export default accountSlice.reducer;
