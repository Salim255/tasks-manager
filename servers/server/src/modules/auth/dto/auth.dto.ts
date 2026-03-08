import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class DataDto {
  user: {
    id: string;
    email: string;
    emailVerified?: boolean;
    createdAt: Date;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export class LoginDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPassword123!' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'StrongPassword123!' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class RegisterResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({
    example: {
      user: {
        id: '1',
        email: 'john@example.com',
        createdAt: '2024-03-05T12:00:00.000Z',
      },
      tokens: {
        accessToken: 'jwt-access-token',
        refreshToken: 'jwt-refresh-token',
      },
    },
  })
  data: DataDto;
}

export class LoginResponseDto extends RegisterResponseDto {}
export class RefreshSessionResponseDto extends LoginResponseDto {}
