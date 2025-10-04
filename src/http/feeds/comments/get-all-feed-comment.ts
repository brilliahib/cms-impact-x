import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { FeedComment } from "@/types/feeds/comment/feed-comment";

interface GetAllFeedCommentResponse {
  data: FeedComment[];
}

export const GetAllFeedCommentHandler = async (
  id: number,
): Promise<GetAllFeedCommentResponse> => {
  const { data } = await api.get<GetAllFeedCommentResponse>(
    `/feeds/${id}/comments`,
    {},
  );

  return data;
};

export const useGetAllFeedComment = (
  id: number,
  options?: Partial<UseQueryOptions<GetAllFeedCommentResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-all-feed-comments", id],
    queryFn: () => GetAllFeedCommentHandler(id),
    ...options,
  });
};
