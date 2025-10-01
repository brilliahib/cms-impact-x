export interface ActivityRegistration {
  id: number;
  user_id: number;
  status: string;
  created_at: Date;
  user: {
    id: number;
    name: string;
    profile: {
      profile_images: string;
      role: string;
      university: string;
    };
  };
}
