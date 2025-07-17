import { ChallengeSupa } from "./ChallengeSupa";

export interface TrialSupa {
  id: string;
  challenge_id : number;
  created_at: string;
  create_by: string;
  deposit: number;
  start_at: string;
  title: string;
  trial_status: string;
  challenge: ChallengeSupa;
}