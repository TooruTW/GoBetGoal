import { TrialSupa } from "./TrialSupa";
import { UserInfoSupa } from "./UserInfoSupa";

export interface TrialDetailSupa {
  challenge_stage_id: string;
  created_at: string;
  end_at: string;
  id: number;
  participant_id: string;
  stage_index: number;
  start_at: string;
  status: string;
  upload_at: string | null;
  upload_image: string[] | null;
  trial_id: string;
  trial: TrialSupa;
  user_info: UserInfoSupa;
}
