import { TrialSupa } from "./TrialSupa";
import { UserInfoSupa } from "./UserInfoSupa";
import { ChallengeStageSupa } from "./ChallengeStageSupa";


export type TrialDetailSupa = {
  challenge_stage_id: string;
  created_at: string;
  end_at: string;
  id: string;
  participant_id: string;
  stage_index: number;
  start_at: string;
  status: string;
  upload_at: string | null;
  upload_image: string[] | null;
  trial_id: string;
  trial: TrialSupa;
  user_info: UserInfoSupa;
  challenge_stage: ChallengeStageSupa;
  chance_remain: number;
}
