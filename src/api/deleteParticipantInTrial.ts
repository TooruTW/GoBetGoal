import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export function useDeleteParticipantInTrial(
  trialId: string,
  participantId: string | null
) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () =>
      fetch(`/api/trials/${trialId}/remove-participant/${participantId}`, {
        method: "DELETE",
      }).then((res) => res.json()),
    onError: (error) => {
      console.log("delete error", error);
    },
    onSuccess: () => {
      console.log("delete success", participantId);
      queryClient.invalidateQueries({ queryKey: ["trial", trialId] });
    },
  });

  return mutation;
}
