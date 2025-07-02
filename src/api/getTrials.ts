import { useQuery } from "@tanstack/react-query";

export function useTrials() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trials"],
    queryFn: () => fetch("/api/trials").then((res) => res.json()),
  });
  return { data, isLoading, error };
}
