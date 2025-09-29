import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ProfileUser } from "@/types/profile/profile-user";

interface GetProfileUserResponse {
  data: ProfileUser;
}

export const GetProfileUserHandler = async (
  token: string,
): Promise<GetProfileUserResponse> => {
  const { data } = await api.get<GetProfileUserResponse>("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetProfileUser = (
  token: string,
  options?: Partial<UseQueryOptions<GetProfileUserResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["profile-user"],
    queryFn: () => GetProfileUserHandler(token),
    ...options,
  });
};
