import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

type TrialParticipant = {
  trial_id: string;
  invite_by: string;
  participant_id: string;
  invite_status: "pending" | "accept" | "reject";
  created_at: string;
  is_close: boolean;
};

const getTrialParticipantsSupa = async (id: string) => {
  const { data, error } = await supabase
    .from("trial_participant")
    .select("*")
    .eq("trial_id", id);

  if (error) throw error;

  return data as TrialParticipant[];
};

export function useGetTrialParticipantsSupa(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trial", id, "participants"],
    queryFn: () => getTrialParticipantsSupa(id),
    enabled: !!id,
  });

  return { data, isLoading, error };
}
