import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { User } from "@/types/user/user";

interface GetUserByUsernameResponse {
  data: User;
}

export const GetUserByUsernameHandler = async (
  username: string,
  token: string,
): Promise<GetUserByUsernameResponse> => {
  const { data } = await api.get<GetUserByUsernameResponse>(
    `/users/${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetUserByUsername = (
  username: string,
  token: string,
  options?: Partial<UseQueryOptions<GetUserByUsernameResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["user-by-username", username],
    queryFn: () => GetUserByUsernameHandler(username, token),
    ...options,
  });
};
