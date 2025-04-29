export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface SocialAuthArgs {
  provider: string;
  state: string;
  code: string;
}

export interface CreateUserResponse {
  success: boolean;
  user: User;
}
