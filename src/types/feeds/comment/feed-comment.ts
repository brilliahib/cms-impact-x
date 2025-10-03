export interface FeedComment {
  id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  user: {
    first_name: string;
    last_name: string;
    username: string;
    role: string;
    university: string;
    profile_images?: string;
  };
}
