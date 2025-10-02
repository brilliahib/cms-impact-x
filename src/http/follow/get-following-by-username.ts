import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

interface GetFollowingByUsernameResponse {
  data: {
    username: string;
  };
}

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

export const useGetFollowingByUsername = (
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
