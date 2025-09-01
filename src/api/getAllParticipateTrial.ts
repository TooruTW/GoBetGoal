import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";

type TrialCategory = {
  participant_id: string;
  trial_id: string;
  invite_by: string;
  created_at: string;
  invite_status: string;
  id: string;
  is_close: boolean;
  trial: {
    end_at: string;
    challenge: {
      category: string[];
      stage_count: number;
    };
  };
};

const getAllParticipateTrial = async () => {
  const { data, error } = await supabase
    .from("trial_participant")
    .select("*, trial(end_at,challenge(category,stage_count))");

  if (error) {
    console.log(error);
    throw error;
  }

  return data as TrialCategory[];
};

export function useGetAllParticipateTrial() {
  return useQuery({
    queryKey: ["getAllParticipateTrial"],
    queryFn: getAllParticipateTrial,
  });
}
