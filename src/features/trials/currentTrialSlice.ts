import { createSlice } from "@reduxjs/toolkit";
import type { Trial } from "./type";

const initialState: Trial = {
  id: "",
  category: "範例",
  checkType: "AI",
  checkFrequency: 0,
  title: "範例",
  description: "範例",
  startDate: new Date(),
  endDate: new Date(),
  createdAt: new Date(),
  createdBy: "園長",
  maxParticipants: 6,
  currentParticipants: [],
  challenges: [],
  challengeCount: 0,
  currentChallengeIndex: 0,
  isActive: false,
  investment: 0,
  reward: 0,
  bounceRate: 0,
};

export const trialsSlice = createSlice({
  name: "trials",
  initialState,
  reducers: {
    loadCurrentTrial: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { loadCurrentTrial } = trialsSlice.actions;
export default trialsSlice.reducer;
