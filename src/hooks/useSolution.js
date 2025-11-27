import { useQuery } from "@tanstack/react-query";
import api from "../api.js";

const useSolution = (id) => {
  return useQuery({
    queryKey: ["solutions", id],
    queryFn: async () =>
      await api
        .get(`/solutions/${id}`)
        .then((res) => res.data.data)
        .catch((err) => err.data.errors),
    enabled: !!id,
    staleTime: 10 * 1000,
  });
};

export default useSolution;
