import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

const deleteFriendSupa = async (
  id: string
) => {
  const { error, data } = await supabase
    .from("fried_relationship")
    .delete()
    .eq("id", id);
  console.log(id, "got kill");
  console.log(data, "data");

  if (error) throw error;
};

export function useDeleteParticipantInTrialSupa() {
  const mutation = useMutation({
    mutationFn: (parm: { id: string}) =>
      deleteFriendSupa(parm.id),
  });

  return mutation;
}
