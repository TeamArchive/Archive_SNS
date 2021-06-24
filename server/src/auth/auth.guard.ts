import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// -> local.strategy.ts
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

// -> jwt.strategy.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// -> google.strategy.ts
@Injectable()
export class GoogleStrategy extends AuthGuard('google') {}