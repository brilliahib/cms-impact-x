import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { User } from "@/types/user/user";

interface GetUsersResponse {
  data: User[];
}

export const GetUsersHandler = async (
  token: string,
): Promise<GetUsersResponse> => {
  const { data } = await api.get<GetUsersResponse>("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useGetUsers = (
  token: string,
  options?: Partial<UseQueryOptions<GetUsersResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => GetUsersHandler(token),
    ...options,
  });
};
