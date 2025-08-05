import { createSlice } from "@reduxjs/toolkit";
import type { UserRelation } from "@/types/UserRelation";
import { UserInfoSupa } from "@/types/UserInfoSupa";

const initialState = {
  friends: [] as UserInfoSupa[],
};

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      const friendMap = new Map();
      
      action.payload.forEach((item: UserRelation) => {
        friendMap.set(item.address_id,item.address_user);
        friendMap.set(item.request_id,item.request_user);
      });

      if(friendMap.size > 0){
        state.friends = Array.from(friendMap.values());
      }
    },
  },
});

export const { setFriends } = friendsSlice.actions;
export default friendsSlice.reducer;
