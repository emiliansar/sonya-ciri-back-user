import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class RefreshAuthGuard extends AuthGuard('refresh-jwt') {
    handleRequest(err, user, info, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const result = super.handleRequest(err, user, info, context);

        request['admin'] = result;

        return result;
    }
}