export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message?: string;
  data: T | null;
}

export type RegisterResponse = ApiResponse<AuthResponse>;
export type LoginResponse = ApiResponse<AuthResponse>;
