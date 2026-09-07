import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/services/api";

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: Boolean(id),
  });
}
