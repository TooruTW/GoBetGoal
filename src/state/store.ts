import { configureStore } from "@reduxjs/toolkit";
import trialsReducer from "@/features/trials/currentTrialSlice";
export const store = configureStore({
  reducer: {
    trials: trialsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
