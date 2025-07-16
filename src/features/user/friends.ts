import { createSlice } from "@reduxjs/toolkit";
import type { UserRelation } from "@/components/types/UserRelation";

const initialState = {
  friends: [] as string[],
};

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      const friendList = new Set();
      action.payload.forEach((item: UserRelation) => {
        friendList.add(item.address_id);
        friendList.add(item.request_id);
      });
      if (friendList.size > 0) {
        state.friends = Array.from(friendList) as string[];
      }
    },
  },
});

export const { setFriends } = friendsSlice.actions;
export default friendsSlice.reducer;
