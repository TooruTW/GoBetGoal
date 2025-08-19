import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";

const getTrialLikeSupa = async ({
  userId,
}: {
  userId: string;
}) => {
  const { data, error } = await supabase
    .from("trial_like")
    .select("*")
    .eq("like_by", userId);
  if (error) throw error;
  return data;
};

export function useGetTrialLikeSupa({
  userId,
}: {
  userId: string;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trialLike"],
    queryFn: () => getTrialLikeSupa({ userId }),
    enabled: !!userId,
  });
  return { data, isLoading, error };
}
