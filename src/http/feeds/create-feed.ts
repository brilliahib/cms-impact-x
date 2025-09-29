import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { FeedType } from "@/validators/feed/feed-validator";

export const CreateFeedHandler = async (body: FeedType, token: string) => {
  const { data } = await api.post("/feeds", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useCreateFeed = (
  options?: UseMutationOptions<unknown, AxiosError, FeedType>,
) => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (body) => CreateFeedHandler(body, session?.access_token ?? ""),
    ...options,
  });
};
