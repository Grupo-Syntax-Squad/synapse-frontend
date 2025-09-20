export default interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  is_admin: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  receive_email: boolean;
}
