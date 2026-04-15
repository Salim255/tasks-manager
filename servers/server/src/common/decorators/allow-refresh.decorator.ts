// src/auth/decorators/allow-refresh.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ALLOW_REFRESH = 'allowRefresh';

export const AllowRefresh = () => SetMetadata(ALLOW_REFRESH, true);
