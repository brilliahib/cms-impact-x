import { ProfileUser } from "../profile/profile-user";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  name?: string;
  email: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  role: string;
  university: string;
  profile: ProfileUser;
}
