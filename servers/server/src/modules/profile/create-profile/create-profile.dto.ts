import { ApiProperty } from "@nestjs/swagger";
import { ApiResponseData } from "src/common/interfaces/shared.interface";
import { IsString, MinLength } from 'class-validator';
import { UserProfile } from "../get-profile/get-profile.dto";


export class CreateProfileResponse extends ApiResponseData<UserProfile> {}

export class CreateProfileDto {
  @ApiProperty({
    example: 'Salim',
    description: 'First name of the user',
  })
  @IsString()
  @MinLength(2)
  firstName!: string;

  @ApiProperty({
    example: 'Hassan',
    description: 'Last name of the user',
  })
  @IsString()
  @MinLength(2)
  lastName!: string;
}