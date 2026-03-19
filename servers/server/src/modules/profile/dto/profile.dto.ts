import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { Profile } from '../entity/profile.entity';
import { ApiResponseData } from 'src/common/interfaces/shared.interface';

export class UserProfile {
  @ApiProperty({ type: Profile })
  profile: Profile;
}

export class CreateProfileResponse extends ApiResponseData<UserProfile> {}

export class GetProfileResponse extends ApiResponseData<UserProfile> {}

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
