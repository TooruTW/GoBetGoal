import { supabase } from "@/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const patchReceiveReward = async ({
  userID,
  trialID,
  reward,
}: {
  userID: string;
  trialID: string;
  reward: number;
}) => {
  const { data, error } = await supabase
    .from("trial_participant")
    .update({
      is_close: true,
    })
    .eq("participant_id", userID)
    .eq("trial_id", trialID);
  const { data: currentAsset, error: currentAssetError } = await supabase
    .from("user_info")
    .select("candy_count")
    .eq("user_id", userID);
  if (currentAssetError) throw currentAssetError;
  const { data: currentAssetData, error: currentAssetDataError } =
    await supabase
      .from("user_info")
      .update({
        candy_count: currentAsset[0].candy_count + reward,
      })
      .eq("user_id", userID);

  console.log(userID, "userID");
  console.log(trialID, "trialID");
  console.log(reward, "reward");

  if (currentAssetDataError) throw currentAssetDataError;

  if (error) {
    console.log(error, "error");
    throw error;
  }

  return { currentAssetData, data };
};

export function usePatchReceiveReward() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: patchReceiveReward,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_info"], exact: false });
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });
  return mutation;
}
