import { useQuery } from "@tanstack/react-query";
import api from "../api.js";

const useProblems = (id) => {
  return useQuery({
    queryKey: ["problems", id],
    queryFn: async () =>
      await api
        .get(`/problems/${id}`)
        .then((res) => res.data.data)
        .catch((err) => err.data.errors),
    enabled: !!id,
    staleTime: 10 * 1000,
  });
};

export default useProblems;
