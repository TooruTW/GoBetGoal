import { configureStore } from "@reduxjs/toolkit";
import trialsReducer from "@/store/slices/trialsSlice";
import screenReducer from "@/store/slices/screenSlice";
import accountReducer from "@/store/slices/accountSlice";
import friendsReducer from "@/store/slices/friendsSlice";
export const store = configureStore({
  reducer: {
    trials: trialsReducer,
    screen: screenReducer,
    account: accountReducer,
    friends: friendsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
