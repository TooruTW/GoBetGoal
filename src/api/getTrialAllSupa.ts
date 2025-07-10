import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

const getTrialAllSupa = async () => {
  const { data, error } = await supabase
    .from("trial")
    .select(`
    *,challenge:challenge_id (catagory,description,frequency,title),
    trial_participant (
      user_info:participant_id (
        nick_name,charactor_img_link
      )
    )
  `);

  if (error) throw error;

  return data;
};

export function useTrialAllSupa() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trial", "all"],
    queryFn: getTrialAllSupa,
  });

  return { data, isLoading, error };
}
