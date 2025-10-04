import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { CareerPath } from "@/types/career/career-path";

interface GetCareerPathResponse {
  data: {
    career_paths: CareerPath[];
  };
}

export const GetCareerPathHandler = async (
  token: string,
): Promise<GetCareerPathResponse> => {
  const { data } = await api.get<GetCareerPathResponse>(`/career`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetCareerPath = (
  token: string,
  options?: Partial<UseQueryOptions<GetCareerPathResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-career-path"],
    queryFn: () => GetCareerPathHandler(token),
    ...options,
  });
};
