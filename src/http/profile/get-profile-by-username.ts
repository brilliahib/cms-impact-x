import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ProfileUser } from "@/types/profile/profile-user";

interface GetProfileByUsernameResponse {
  data: ProfileUser;
}

export const GetProfileByUsernameHandler = async (
  username: string,
  token: string,
): Promise<GetProfileByUsernameResponse> => {
  const { data } = await api.get<GetProfileByUsernameResponse>(
    `/profile/user/${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetProfileByUsername = (
  username: string,
  token: string,
  options?: Partial<UseQueryOptions<GetProfileByUsernameResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["profile-user-by-username", username],
    queryFn: () => GetProfileByUsernameHandler(username, token),
    ...options,
  });
};
