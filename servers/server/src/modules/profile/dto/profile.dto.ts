import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    example: 'Salim',
    description: 'First name of the user',
  })
  @IsString()
  @MinLength(2)
  firstName: string;

  @ApiProperty({
    example: 'Hassan',
    description: 'Last name of the user',
  })
  @IsString()
  @MinLength(2)
  lastName: string;
}
