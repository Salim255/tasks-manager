import type { Profile } from "../../profile/model/profile.model";
import type { MemberRole } from "../../members/form-builder/memberFormBuilder";

export interface Member {
  id: string;  
  projectId: string;
  profile: Profile;
  userId: string;
  role: MemberRole; // 'admin' | 'member'
  createdAt: Date;
}