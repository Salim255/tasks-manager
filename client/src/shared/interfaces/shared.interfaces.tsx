export type MemberRole = "admin" | "member";

export interface Member {
  id: string;
  role: MemberRole;
  userId: string;
  profile: UserProfile | null;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  bio: string | null;
}

export interface ApiErrorDto {
  status: "error";
  message: string;
  data: null;
  stack?: string;
}

export interface UserSummary {
  id: string;
  profile: UserProfile;
}