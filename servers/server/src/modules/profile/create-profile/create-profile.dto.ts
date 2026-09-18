import { ApiProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator/types/decorator/string/MinLength";
import { IsString } from "class-validator/types/decorator/typechecker/IsString";

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