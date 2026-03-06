import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPassword123!' })
  @IsString()
  @MinLength(8)
  password: string;
}

export class RegisterResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({
    example: {
      user: {
        id: "1",
        email: 'john@example.com',
        createdAt: '2024-03-05T12:00:00.000Z',
      },
      tokens: {
        accessToken: 'jwt-access-token',
        refreshToken: 'jwt-refresh-token',
      },
    },
  })
  data: {
    user: {
      id: string;
      email: string;
      createdAt: Date;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}
