import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

interface GetCountFollowUserResponse {
  data: {
    username: string;
    followers_count: number;
    followings_count: number;
  };
}

export const GetCountFollowUserHandler = async (
  username: string,
  token: string,
): Promise<GetCountFollowUserResponse> => {
  const { data } = await api.get<GetCountFollowUserResponse>(
    `/follows/${username}/counts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetCountFollowUser = (
  username: string,
  token: string,
  options?: Partial<UseQueryOptions<GetCountFollowUserResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["count-follow-user", username],
    queryFn: () => GetCountFollowUserHandler(username, token),
    ...options,
  });
};
