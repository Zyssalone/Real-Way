export interface User {
  user_id: number;
  username: string;
  user_type: 'admin' | 'passenger' | 'freight_customer';
}

export interface LoginForm {
  username: string;
  password: string;
}