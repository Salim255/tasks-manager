import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorResponseDto {
  @ApiProperty({ example: 'error' })
  status: 'error';

  @ApiProperty({ example: 'Project not found' })
  message: string;

  @ApiProperty({ example: null })
  data: null;
}
