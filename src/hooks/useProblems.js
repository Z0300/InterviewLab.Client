import { useQuery } from "@tanstack/react-query";
import api from "../api.js";

const useProblems = () => {
  const fetchProblems = () => api.get("/problems").then((res) => res.data.data);

  return useQuery({
    queryKey: ["problems"],
    queryFn: fetchProblems,
    staleTime: 10 * 1000,
  });
};

export default useProblems;
