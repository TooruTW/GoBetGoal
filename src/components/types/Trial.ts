import type { Challenge } from "./Challenge";
import type { Participant } from "./Participant";
import type { TrialHistory } from "./TrialHistory";
export interface Trial {
  id: string;
  isPublic: boolean;
  category: "飲食" | "運動" | "作息" | "範例";
  checkType: "AI" | "MANUAL";
  checkFrequency: "每日" | "每週" | "每月";
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    duration: number;
    createdAt: string;
    createdBy: string;
    maxParticipants: number;
    currentParticipants: Participant[];
    challenges: Challenge[];
    passedChallengesCount: number;
    challengeCount: number;
    currentChallengeIndex: number;
    trialState: "待開始" | "進行中" | "已結束" | "通過" | "完美通過";
    investment: number;
    reward: number;
    bounceRate: number;
    history:TrialHistory[]
  }
  
  
  