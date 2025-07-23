import { createSlice } from "@reduxjs/toolkit";
import { ChallengeSupa } from "@/types/ChallengeSupa";

const initialState = {
  challenge: [] as ChallengeSupa[],
};

export const challengeTemplateSlice = createSlice({
  name: "challengeTemplate",
  initialState,
  reducers: {
    setChallengeTemplate: (state, action) => {
      state.challenge = action.payload;
    },
  },
});

export const { setChallengeTemplate } = challengeTemplateSlice.actions;
export default challengeTemplateSlice.reducer;
