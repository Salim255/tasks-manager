export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export class MeResponseDto {
  status!: string;
  data!: {
    user: {
      id: string;
      email: string;
      emailVerified: boolean;
      createdAt: Date;
      demoClientId: string | null;
      isDemo: boolean | null;
    };
  };
}
