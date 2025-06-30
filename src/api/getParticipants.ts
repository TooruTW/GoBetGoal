import { useQuery } from "@tanstack/react-query";

export function useParticipants() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["participants"],
    queryFn: () => fetch("/api/participants").then((res) => res.json()),
  });
  return { data, isLoading, error };
}
