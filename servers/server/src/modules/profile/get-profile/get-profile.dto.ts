import { ApiResponseData } from "src/common/interfaces/shared.interface";
    
import { Profile } from "../entity/profile.entity";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class UserProfile {
  @ApiProperty({ type: Profile })
  profile!: Profile;
}

export class GetProfileResponse extends ApiResponseData<UserProfile> {}

