import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

interface GetIsFollowingUserResponse {
  data: {
    username: string;
    is_following: boolean;
  };
}

export const GetIsFollowingUserHandler = async (
  username: string,
  token: string,
): Promise<GetIsFollowingUserResponse> => {
  const { data } = await api.get<GetIsFollowingUserResponse>(
    `/follows/${username}/is-following`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetIsFollowingUser = (
  username: string,
  token: string,
  options?: Partial<UseQueryOptions<GetIsFollowingUserResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["is-following-user", username],
    queryFn: () => GetIsFollowingUserHandler(username, token),
    ...options,
  });
};
