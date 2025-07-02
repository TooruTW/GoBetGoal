import { useQuery } from "@tanstack/react-query";

export function useTrial(id: string) {
  const url = `/api/trials/${id}`;
  const { data, isLoading, error } = useQuery({
    queryKey: ["trial", id],
    queryFn: () => fetch(url).then((res) => res.json()),
  });

  return { data, isLoading, error };
}
