import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const whitelistedPaths = ['/api/oauth2', '/api/tournaments'];
        if (whitelistedPaths.some((path) => context.switchToHttp().getRequest().url.startsWith(path))) {
            return true;
        }
        return super.canActivate(context);
    }
}
