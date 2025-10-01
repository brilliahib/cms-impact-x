import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { User } from "@/types/user/user";

interface GetSuggestPeopleResponse {
  data: User[];
}

export const GetSuggestPeopleHandler = async (
  token: string,
): Promise<GetSuggestPeopleResponse> => {
  const { data } = await api.get<GetSuggestPeopleResponse>(
    "/users/suggestions",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetSuggestPeople = (
  token: string,
  options?: Partial<UseQueryOptions<GetSuggestPeopleResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["suggest-people"],
    queryFn: () => GetSuggestPeopleHandler(token),
    ...options,
  });
};
