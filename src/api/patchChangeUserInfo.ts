import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";

const patchChangeUserInfo = async ({
  target,
  value,
  userID,
}: {
  target:
    | "nick_name"
    | "character_img_link"
    | "total_trial_count"
    | "trial_count"
    | "trial_pass_count"
    | "liked_post_count"
    | "friend_count"
    | "candy_count"
    | "cheat_blanket";
  value: number | string;
  userID: string;
}) => {
  console.log("Updating user_info:", { target, value, userID });

  // 先檢查記錄是否存在
  const { data: existingData, error: checkError } = await supabase
    .from("user_info")
    .select("*")
    .eq("user_id", userID);

  if (checkError) throw checkError;
  console.log("Existing data:", existingData);

  if (!existingData || existingData.length === 0) {
    throw new Error(`User with ID ${userID} not found`);
  }

  const { data, error } = await supabase
    .from("user_info")
    .update({ [target]: value })
    .eq("user_id", userID)
    .select();

  console.log("Update error:", error);
  console.log("Update result:", data);

  if (error) throw error;

  return data;
};

export function usePatchChangeUserInfo() {
  const mutation = useMutation({
    mutationFn: patchChangeUserInfo,
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
}
