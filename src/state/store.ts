import { configureStore } from "@reduxjs/toolkit";
import trialsReducer from "@/features/trials/currentTrialSlice";
import screenReducer from "@/features/user/currentScreenSize";
export const store = configureStore({
  reducer: {
    trials: trialsReducer,
    screen: screenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
