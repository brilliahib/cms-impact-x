import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Feed } from "@/types/feeds/feed";

interface GetAllFeedUserResponse {
  data: Feed[];
}

export const GetAllFeedUserHandler = async (
  username: string,
  token: string,
): Promise<GetAllFeedUserResponse> => {
  const { data } = await api.get<GetAllFeedUserResponse>(
    `/feeds/user/${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllFeedUser = (
  username: string,
  token: string,
  options?: Partial<UseQueryOptions<GetAllFeedUserResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["feed-user", username],
    queryFn: () => GetAllFeedUserHandler(username, token),
    ...options,
  });
};
