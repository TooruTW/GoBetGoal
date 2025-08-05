export type Post = {
    id: string;
    content: string;
    create_at: string;
    history: number | null;
    image_url: string[];
    publish_by: string;
    trial_id: string;
    trial: {
      title: string;
      challenge: { title: string; category: string[] };
    };
    user_info: {
      nick_name: string;
      charactor_img_link: string;
    };
    post_like: { like_by: string }[];
  };