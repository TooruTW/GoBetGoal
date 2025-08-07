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
        friendMap.set(item.address_id,{ ...item.address_user,friend_state:item.state as "pending" | "accept" | "reject"});
        friendMap.set(item.request_id,{ ...item.request_user,friend_state:item.state as "pending" | "accept" | "reject"});
      });

      if (friendMap.size > 0) {
        state.friends = Array.from(friendMap.values());
      }
      console.log("set friends",state.friends);
      
    },
    setRemoveSelf: (state, action) => {
      console.log("remove self",action.payload);
      state.friends = state.friends.filter(friend => friend.user_id !== action.payload);
      console.log("remove complete",state.friends);
    }
  },
});

export const { setFriends, setRemoveSelf } = friendsSlice.actions;
export default friendsSlice.reducer;
