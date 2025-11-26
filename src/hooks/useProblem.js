import { useQuery } from "@tanstack/react-query";
import api from "../api.js";

const useProblems = (problemId) => {
  return useQuery({
    queryKey: ["problems", problemId],
    queryFn: async () =>
      await api
        .get(`/problems/${problemId}`)
        .then((res) => res.data.data)
        .catch((err) => err.data.errors),
    enabled: !!problemId,
    staleTime: 10 * 1000,
  });
};

export default useProblems;
