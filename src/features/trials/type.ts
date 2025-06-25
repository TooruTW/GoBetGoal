import type { Participant } from "@/components/types/Participant";
export interface Trial {
  id: string;
  category: "飲食" | "運動" | "作息" | "範例";
  checkType: "AI" | "MANUAL";
  checkFrequency: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  createdBy: string;
  maxParticipants: number;
  currentParticipants: Participant[];
  challenges: Challenge[];
  challengeCount: number;
  currentChallengeIndex: number;
  isActive: boolean;
  investment: number;
  reward: number;
  bounceRate: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  state:
    | "NOT_STARTED"
    | "IN_PROGRESS"
    | "PASSED"
    | "PASSED_WITHOUT_HONOR"
    | "FAILED";
  uploadImage: UploadImage[] | null;
  exampleImage: string[];
  checkCountRemain: 3 | 2 | 1 | 0;
}

export interface UploadImage {
  id: string;
  imageUrl: string;
  createdAt: Date;
  isPassed: boolean;
}
