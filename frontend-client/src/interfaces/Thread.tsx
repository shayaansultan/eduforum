export interface Thread {
  thread_id: number;
  title: string;
  content: string;
  user_id: number;
  username: string;
  category_id: number;
  category_name: string;
  comment_count: number;
  created_at: string;
  updated_at: string;
  is_edited: boolean;
}