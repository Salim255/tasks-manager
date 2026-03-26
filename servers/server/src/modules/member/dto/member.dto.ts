export type MemberRole = 'admin' | 'member';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Member } from '../entity/member.entity';
import { ApiResponseData } from 'src/common/interfaces/shared.interface';

export enum ProjectMemberRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export class ProjectMember {
  @ApiProperty({ type: Member })
  member: Member;
}

export class CreateMemberResponse extends ApiResponseData<ProjectMember> {}

export class CreateMemberDto {
  @ApiProperty({
    description: 'The ID of the project the user will be added to',
    example: '1960e80a-fb58-40fe-aa22-cbe6e2edf5bc',
  })
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({
    description: 'The email of the user we want to add to the project',
    example: 'b7e1c2d3-4f5a-6789-bcde-987654321000',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The role of the user inside the project',
    enum: ProjectMemberRole,
    example: ProjectMemberRole.MEMBER,
  })
  @IsEnum(ProjectMemberRole)
  @IsNotEmpty()
  role: ProjectMemberRole;
}
