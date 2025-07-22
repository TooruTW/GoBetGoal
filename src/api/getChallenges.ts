import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";

const getChallenges = async () => {
  const { data, error } = await supabase.from("challenge").select("*");
  if (error) {
    console.log("error", error);
  }
  return data;
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
