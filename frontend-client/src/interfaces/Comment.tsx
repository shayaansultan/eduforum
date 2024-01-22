export interface Comment {
  comment_id: number;
  content: string;
  thread_id: number;
  thread_title: string;
  user_id: string;
  user_email: string;
  username: string;
  created_at: string;
  updated_at: string;
  is_edited: boolean;
}