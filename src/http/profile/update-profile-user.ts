import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { ProfileUser } from "@/types/profile/profile-user";
import { UpdateUserAndProfileType } from "@/validators/profile/update-profile-validator";

interface UpdateProfileUserResponse {
  data: ProfileUser;
}

export const UpdateProfileUserHandler = async (
  body: UpdateUserAndProfileType,
  token: string,
): Promise<UpdateProfileUserResponse> => {
  const formData = new FormData();

  if (body.first_name) {
    formData.append("first_name", body.first_name);
  }

  if (body.last_name) {
    formData.append("last_name", body.last_name);
  }

  if (body.username) {
    formData.append("username", body.username);
  }

  if (body.about_description) {
    formData.append("about_description", body.about_description);
  }

  if (body.role) {
    formData.append("role", body.role);
  }

  if (body.university) {
    formData.append("university", body.university);
  }

  if (body.major) {
    formData.append("major", body.major);
  }

  if (body.profile_images) {
    formData.append("profile_images", body.profile_images);
  }

  if (body.contact_info) {
    body.contact_info.forEach((info, i) => {
      formData.append(`contact_info[${i}]`, info);
    });
  }

  if (body.skills) {
    body.skills.forEach((skill, i) => {
      formData.append(`skills[${i}]`, skill);
    });
  }

  const { data } = await api.post("/profile/user", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const useUpdateProfileUser = (
  options?: UseMutationOptions<
    UpdateProfileUserResponse,
    AxiosError<UpdateProfileUserResponse>,
    UpdateUserAndProfileType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: UpdateUserAndProfileType) =>
      UpdateProfileUserHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
