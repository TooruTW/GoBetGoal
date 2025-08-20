import { supabase } from "@/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const patchReadNotificationSupa = async (id: string[]) => {
  const { data, error } = await supabase
    .from("notification")
    .update({ is_readed: true })
    .in("id", id);
  if (error) {
    throw error;
  }
  return data;
};

export function usePatchReadNotificationSupa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchReadNotificationSupa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
  });
}
