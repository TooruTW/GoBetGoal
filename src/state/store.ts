import { configureStore } from "@reduxjs/toolkit";
import trialsReducer from "@/features/trials/currentTrialSlice";
import screenReducer from "@/features/user/currentScreenSize";
import accountReducer from "@/features/user/account";
import friendsReducer from "@/features/user/friends";
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
