import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { User } from "@/types/user/user";

interface GetProfileSummaryResponse {
  data: User;
}

export const GetProfileSummaryHandler = async (
  token: string,
): Promise<GetProfileSummaryResponse> => {
  const { data } = await api.get<GetProfileSummaryResponse>(
    "/auth/get-profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetProfileSummary = (
  token: string,
  options?: Partial<UseQueryOptions<GetProfileSummaryResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-profile-summary"],
    queryFn: () => GetProfileSummaryHandler(token),
    ...options,
  });
};
