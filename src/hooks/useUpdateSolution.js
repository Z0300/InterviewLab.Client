import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate.js";

const useUpdateSolution = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const response = await axiosPrivate.put(`/solutions/${id}`, payload);
      return response.data?.data;
    },
    onSuccess: async (data) => {
      const { id: solutionId, problemId } = data ?? {};

      if (!problemId || !solutionId) {
        return;
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["problems", problemId, "solutions"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["problems", problemId, "solutions", solutionId],
        }),
      ]);
    },
    onError: (err) => {
      console.error("Update solution failed", err);
      throw err;
    },
  });
};

export default useUpdateSolution;
