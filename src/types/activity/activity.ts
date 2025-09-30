import { User } from "../user/user";

export interface Activity {
  id: number;
  user_id: number;
  title: string;
  activity_type: string;
  activity_category: string;
  images: string;
  location: string;
  start_date: Date;
  end_date: Date;
  max_participants: number;
  description: string;
  requirements: string;
  benefits?: string;
  total_participants: number;
  participants?: ActivityParticipant[];
  user: User;
  created_at: Date;
  updated_at: Date;
}

export interface ActivityParticipant {
  id: number;
  name: string;
  profile_images: string;
  username: string;
  role: string;
  university: string;
}
