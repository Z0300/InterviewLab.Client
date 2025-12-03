import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios.js";

const useProblems = (problemId) => {
  return useQuery({
    queryKey: ["problems", problemId],
    queryFn: async () =>
      await axios
        .get(`/problems/${problemId}`)
        .then((res) => res.data.data)
        .catch((err) => err.data.errors),
    enabled: !!problemId,
    staleTime: 10 * 1000,
  });
};

export default useProblems;
