import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate.js";

const useCreateProblem = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await axiosPrivate.post("/problems", payload);
      return response.data?.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
    onError: (err) => {
      console.error("Create problem failed", err);
      throw err;
    },
  });
};

export default useCreateProblem;
