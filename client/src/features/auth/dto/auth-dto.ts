import type { User } from "../model/user.model";

export type AuthType = "login" | "register" | "demo-login";

export type AuthPayload = {
    password: string; 
    email: string;
    authType: AuthType;
    lastName?: string;
    firstName?: string;
 };

export type AuthResponseDto = {
    status: string;
    data: {
        user: User | null;
    }
}
