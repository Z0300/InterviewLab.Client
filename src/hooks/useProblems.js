import { useQuery, keepPreviousData } from "@tanstack/react-query";
import api from "../api.js";

const fetchProblems = async ({ queryKey }) => {
  const [, search, page, pageSize] = queryKey;
  const res = await api.get("problems", {
    params: { search: search, page: page, pageSize: pageSize || 10 },
  });

  return res.data.data;
};

const useProblems = (search = "", page = 1, pageSize = 20) => {
  return useQuery({
    queryKey: ["problems", search, page, pageSize],
    queryFn: fetchProblems,
    staleTime: 30 * 1000,
    placeholderData: keepPreviousData,
  });
};

export default useProblems;
