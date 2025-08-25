import { supabase } from "@/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteNotificationSupa = async (id: string) => {
  const { data, error } = await supabase
    .from("notification")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("error", error);
  }
  return data;
};

export const useDeleteNotificationSupa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotificationSupa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
