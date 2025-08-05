import { UserInfoSupa } from "./UserInfoSupa";

export type UserRelation = {
  id: string;
  inviter_at: string;
  request_id: string;
  request_user: UserInfoSupa;
  address_id: string;
  address_user: UserInfoSupa;
  state: string;
  note: string;
  last_updated: string;
};
