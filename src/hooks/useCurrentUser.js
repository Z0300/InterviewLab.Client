import { useQuery } from "@tanstack/react-query";
import api from "../api.js";

const useCurrentUser = () =>
  useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data.data;
    },
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 0,
  });

export default useCurrentUser;
