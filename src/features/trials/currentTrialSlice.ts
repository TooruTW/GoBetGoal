import { createSlice } from "@reduxjs/toolkit";
import type { Trial } from "./type";

const initialState: Trial = {
  id: "",
  isPublic: false,
  category: "範例",
  checkType: "AI",
  checkFrequency: "每日",
  title: "範例",
  description: "範例",
  startDate: "no time data",
  endDate: "no time data",
  duration: 0,
  createdAt: "no time data",
  createdBy: "園長",
  maxParticipants: 6,
  currentParticipants: [],
  challenges: [],
  challengeCount: 0,
  passedChallengesCount: 0,
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
