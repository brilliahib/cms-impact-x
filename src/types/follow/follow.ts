export interface FollowUser {
  id: number;
  name: string;
  username: string;
  is_followed: boolean;
  profile_images: string | null;
  role: string | null;
  university: string | null;
}
