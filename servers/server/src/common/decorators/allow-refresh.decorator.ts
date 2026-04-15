// src/auth/decorators/allow-refresh.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { ALLOW_REFRESH } from '../constants/constants';

export const AllowRefresh = () => SetMetadata(ALLOW_REFRESH, true);
