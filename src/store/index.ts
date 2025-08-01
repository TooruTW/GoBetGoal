import { configureStore } from "@reduxjs/toolkit";
import screenReducer from "@/store/slices/screenSlice";
import accountReducer from "@/store/slices/accountSlice";
import friendsReducer from "@/store/slices/friendsSlice";
import challengeTemplateReducer from "@/store/slices/challengeTemplate";
export const store = configureStore({
  reducer: {
    screen: screenReducer,
    account: accountReducer,
    friends: friendsReducer,
    challengeTemplate: challengeTemplateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
