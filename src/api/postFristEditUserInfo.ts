import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

type UserInfo = {
  nickname: string;
  avatarUrl: string;
  user_id: string;
};

const postFristEditUserInfo = async (userInfo: UserInfo) => {
  const { data, error } = await supabase
  .from('user_info')
  .insert([
    { user_id: userInfo.user_id, charactor_img_link: userInfo.avatarUrl,nick_name:userInfo.nickname },
  ])
  .select()
  if (error) throw error;
  return data;
};

export function usePostFristEditUserInfo() {
  const mutation = useMutation({
    mutationFn: (userInfo: UserInfo) => postFristEditUserInfo(userInfo),
  });

  return mutation;
}
