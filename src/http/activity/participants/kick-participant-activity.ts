import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ActivityParticipant } from "@/types/activity/activity";
import { useSession } from "next-auth/react";

interface KickParticipantsActivityPayload {
  id: number;
}

interface KickParticipantsActivityResponse {
  data: ActivityParticipant;
}

export const useKickParticipantsActivity = (
  options?: UseMutationOptions<
    KickParticipantsActivityResponse,
    AxiosError<unknown>,
    KickParticipantsActivityPayload
  >,
) => {
  const { data: session } = useSession();
  const token = session?.access_token as string;

  const KickParticipantsActivityHandler = async ({
    id,
  }: KickParticipantsActivityPayload): Promise<KickParticipantsActivityResponse> => {
    if (!token) throw new Error("Token tidak ditemukan");

    const { data } = await api.delete(`/participants/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  return useMutation({
    mutationFn: KickParticipantsActivityHandler,
    ...options,
  });
};
