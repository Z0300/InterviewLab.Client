import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate.js";

const useAddSolution = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await axiosPrivate.post("/solutions", payload);
      return response.data?.data;
    },
    onSuccess: async (solution) => {
      if (solution?.problemId) {
        await queryClient.invalidateQueries({
          queryKey: ["problems", solution.problemId],
        });
      }
    },
    onError: (err) => {
      console.error("Add solution failed", err);
      throw err;
    },
  });
};

export default useAddSolution;
