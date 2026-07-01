import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class DataDtoWithTokens {
  user!: {
    id: string;
    email: string;
    emailVerified?: boolean;
    createdAt: Date;
    isDemo: boolean;
    demoClientId: string | null;
  };
  tokens!: {
    accessToken: string;
    refreshToken: string;
  };
}


export class DataDto {
  user!: {
    id: string;
    email: string;
    emailVerified?: boolean;
    createdAt: Date;
    isDemo: boolean;
    demoClientId: string | null;
  };
}


export class DemoLoginDto {
  @ApiProperty({ example: 'bce2f734-b995-4a28-ad42-e0e2a2effd9a' })
  @IsString()
  @IsNotEmpty()
  demoClientId!: string;
}

export class LoginDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'StrongPassword123!' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'StrongPassword123!' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}

export class RegisterResponseDto {
  @ApiProperty({ example: 'success' })
  status!: string;

  @ApiProperty({
    example: {
      user: {
        id: '1',
        email: 'john@example.com',
        createdAt: '2024-03-05T12:00:00.000Z',
        emailVerified: false,
        isDemo: false,
        demoClientId: null
      }
    },
  })
  data!: DataDto;
}

export class LoginResponseDto extends RegisterResponseDto {}
export class RefreshSessionResponseDto extends LoginResponseDto {}
