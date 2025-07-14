import { ChallengeSupa } from "./challengeSupa";

export interface TrialSupa {
  id: string;
  challenge_id : number;
  created_at: string;
  create_by: string;
  deposit: number;
  start_at: string;
  title: string;
  trual_status: string;
  challenge: ChallengeSupa;
}