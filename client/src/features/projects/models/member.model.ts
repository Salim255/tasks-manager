import type { Profile } from "../../profile/model/profile.model";
import type { MemberRole } from "../forms-builders/memberFormBuilder";

export interface Member {
  id: string;  
  projectId: string;
  profile: Profile;
  userId: string;
  role: MemberRole; // 'admin' | 'member'
  createdAt: Date;
}