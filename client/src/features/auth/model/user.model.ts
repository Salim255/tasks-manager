export interface User {
    id: string,
    email : string;
    emailVerified: boolean;
    createdAt: string;
    isDemo: boolean;
    demoClientId: string | null;
}

export interface AuthResponse {
  user: User;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message?: string;
  data: T | null;
}

export type RegisterResponse = ApiResponse<AuthResponse>;
export type LoginResponse = ApiResponse<AuthResponse>;
