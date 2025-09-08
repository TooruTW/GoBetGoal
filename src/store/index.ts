import { configureStore } from "@reduxjs/toolkit";
import screenReducer from "@/store/slices/screenSlice";
import accountReducer from "@/store/slices/accountSlice";
import friendsReducer from "@/store/slices/friendsSlice";
import challengeTemplateReducer from "@/store/slices/challengeTemplate";
import popoutReducer from "@/store/slices/popoutSlice";
import toastReducer from "@/store/slices/toastSlice";

export const store = configureStore({
  reducer: {
    screen: screenReducer,
    account: accountReducer,
    friends: friendsReducer,
    challengeTemplate: challengeTemplateReducer,
    popouts: popoutReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
