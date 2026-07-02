export interface ApiErrorDto {
  status: "error";
  message: string;
  data: null;
  stack?: string;
}

export interface UserSummary {
  id: string;
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    bio: string | null;
  };
}