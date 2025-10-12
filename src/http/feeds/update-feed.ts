import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { FeedType } from "@/validators/feed/feed-validator";
import { Feed } from "@/types/feeds/feed";

interface UpdateFeedResponse {
  data: Feed;
}

export const UpdateFeedHandler = async (
  id: number,
  body: FeedType,
  token: string,
): Promise<UpdateFeedResponse> => {
  const { data } = await api.put(`/feeds/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdateFeed = (
  options?: UseMutationOptions<
    UpdateFeedResponse,
    AxiosError,
    { id: number; body: FeedType }
  >,
) => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async ({ id, body }) =>
      UpdateFeedHandler(id, body, session?.access_token as string),
    ...options,
  });
};
