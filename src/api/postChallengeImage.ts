import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export function usePostChallengeImage(
  trialId: string,
  challengeId: string,
  imageId: string | null,
  imageUrl: string | null
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      fetch(
        `/api/trials/trial-detail/${trialId}/upload-image/${challengeId}/${imageId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl }),
        }
      ).then((res) => res.json()),
    onError: (error) => {
      console.log("post error", error);
    },
    onMutate: () => {
      console.log("uploading", imageId);
    },
    onSuccess: () => {
      console.log("upload success", trialId, challengeId, imageId);
      queryClient.invalidateQueries({ queryKey: ["trial", trialId] });
    },
  });

  return mutation;
}
