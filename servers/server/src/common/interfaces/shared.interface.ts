import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorResponseDto {
  @ApiProperty({ example: 'error' })
  status: 'error';

  @ApiProperty({ example: 'Project not found' })
  message: string;

  @ApiProperty({
    type: 'null',
    example: null,
    description: 'Always null in error responses',
  })
  data: null;
}

export class ApiResponseData<T> {
  @ApiProperty({ description: 'Wrapped response payload' })
  payload: T;
}

export class ApiResponse<T> {
  @ApiProperty({
    example: 'success',
    description: 'Request status',
  })
  status: 'success' | 'error';

  @ApiProperty({
    description: 'Response data wrapper',
    type: () => ApiResponseData,
  })
  data: ApiResponseData<T>;
}
