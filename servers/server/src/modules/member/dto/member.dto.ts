export type MemberRole = 'admin' | 'member';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum } from 'class-validator';

export enum ProjectMemberRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export class CreateMemberDto {
  @ApiProperty({
    description: 'The ID of the project the user will be added to',
    example: '1960e80a-fb58-40fe-aa22-cbe6e2edf5bc',
  })
  @IsUUID()
  projectId: string;

  @ApiProperty({
    description: 'The ID of the user being added to the project',
    example: 'b7e1c2d3-4f5a-6789-bcde-987654321000',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'The role of the user inside the project',
    enum: ProjectMemberRole,
    example: ProjectMemberRole.MEMBER,
  })
  @IsEnum(ProjectMemberRole)
  role: ProjectMemberRole;
}
