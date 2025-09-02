import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";

import type { ChallengeSupa } from "@/types/ChallengeSupa";

const getChallenges = async (): Promise<ChallengeSupa[]> => {
  const { data, error } = await supabase
    .from("challenge")
    .select("*,challenge_stage(*)");

  if (error) {
    console.log("error", error);
  }

  return data || [];
};

export function useGetChallenges() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["challenges"],
    queryFn: getChallenges,
  });

  if (error) {
    console.log("error", error);
  }

  return { data, error, isLoading };
}
