import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { CareerType } from "@/validators/career/career-validator";

export const CreateCareerPathHandler = async (
  body: CareerType,
  token: string,
) => {
  const { data } = await api.post("/works", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useCreateCareerPath = (
  options?: UseMutationOptions<unknown, AxiosError, CareerType>,
) => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (body) =>
      CreateCareerPathHandler(body, session?.access_token ?? ""),
    ...options,
  });
};
