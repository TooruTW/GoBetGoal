export type Post = {
  id: string;
  content: string;
  created_at: string;
  trial_history_id: string | null;
  image_url: string[];
  publish_by: string;
  trial_id: string;
  trial: {
    title: string;
    challenge: { title: string; category: string[] };
  };
  user_info: {
    nick_name: string;
    character_img_link: string;
  };
  post_like: { like_by: string }[];
};
