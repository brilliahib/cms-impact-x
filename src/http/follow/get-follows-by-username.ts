import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { FollowUser } from "@/types/follow/follow";

interface GetFollowingByUsernameResponse {
  data: FollowUser[];
}

export const GetFollowersByUserHandler = async (
  username: string,
  token: string,
): Promise<GetFollowingByUsernameResponse> => {
  const { data } = await api.get<GetFollowingByUsernameResponse>(
    `/follows/${username}/followers`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetFollowersByUsername = (
  username: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetFollowingByUsernameResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["followers-user", username],
    queryFn: () => GetFollowersByUserHandler(username, token),
    ...options,
  });
};

export const GetFollowingByUserHandler = async (
  username: string,
  token: string,
): Promise<GetFollowingByUsernameResponse> => {
  const { data } = await api.get<GetFollowingByUsernameResponse>(
    `/follows/${username}/followings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetFollowingsByUsername = (
  username: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetFollowingByUsernameResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["followings-user", username],
    queryFn: () => GetFollowingByUserHandler(username, token),
    ...options,
  });
};
