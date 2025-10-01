import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";

export const UnfollowUserHandler = async (username: string, token: string) => {
  const { data } = await api.delete(`/follows/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUnfollowUser = (
  options?: UseMutationOptions<unknown, AxiosError, string>,
) => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (username: string) =>
      UnfollowUserHandler(username, session?.access_token ?? ""),
    ...options,
  });
};
