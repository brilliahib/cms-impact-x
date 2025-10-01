import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { RegistrationUpdateType } from "@/validators/activity/registration/registration-update-validator";

export const UpdateActivityRegistrationHandler = async (
  id: number,
  body: RegistrationUpdateType,
  token: string,
) => {
  const { data } = await api.put(`/registrations/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdateActivityRegistration = (
  id: number,
  options?: UseMutationOptions<unknown, AxiosError, RegistrationUpdateType>,
) => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (body) =>
      UpdateActivityRegistrationHandler(id, body, session?.access_token ?? ""),
    ...options,
  });
};
