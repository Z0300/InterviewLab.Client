import { useQuery } from "@tanstack/react-query";
import api from "../api.js";

const useProblems = () => {
  return useQuery({
    queryKey: ["problems"],
    queryFn: async () =>
      await api
        .get("/problems")
        .then((res) => res.data.data)
        .catch((err) => err.data.errors),
    staleTime: 10 * 1000,
  });
};

export default useProblems;
