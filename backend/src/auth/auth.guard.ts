import { JwtService } from "@nestjs/jwt"
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { JWT_SECRET } from "src/constants"

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request: Request = context.switchToHttp().getRequest()
        const token: string | undefined = this.extractTokenFromHeader(request)

        if (!token) {
            throw new UnauthorizedException('Access token not found!')
        }

        try {
            const payload = this.jwtService.verify(token, {
                secret: JWT_SECRET
            })

            request['user'] = payload
        } catch {
            throw new UnauthorizedException('Invalid access token!')
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token]: string[] = request.headers['authorization']?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}
