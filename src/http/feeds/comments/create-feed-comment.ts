import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { FeedCommentType } from "@/validators/feed/comment/feed-comment-validator";

export const CreateFeedCommentHandler = async (
  id: number,
  body: FeedCommentType,
  token: string,
) => {
  const { data } = await api.post(`/feeds/${id}/comments`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useCreateFeedComment = (
  id: number,
  options?: UseMutationOptions<unknown, AxiosError, FeedCommentType>,
) => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (body) =>
      CreateFeedCommentHandler(id, body, session?.access_token ?? ""),
    ...options,
  });
};
