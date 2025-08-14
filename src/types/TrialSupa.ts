import { ChallengeSupa } from "./ChallengeSupa";

export type TrialSupa = {
  id: string;
  challenge_id: string;
  created_at: string;
  create_by: string;
  deposit: number;
  start_at: string;
  end_at: string;
  title: string;
  trial_status: string;
  challenge: ChallengeSupa;
  trial_participant: {
    user_info: {
      nick_name: string;
      character_img_link: string;
      user_id: string;
    };
  }[];
};
