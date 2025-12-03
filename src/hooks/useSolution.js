import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate.js";

const useSolution = (id) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["solutions", id],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/solutions/${id}`);
      return res.data.data;
    },
    enabled: !!id,
    staleTime: 10 * 1000,
  });
};

export default useSolution;
