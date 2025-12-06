import { API_KEY } from "src/constants"
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"

@Injectable()
export class WeatherGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request: Request = context.switchToHttp().getRequest()
        const key: string = request.headers['x-api-key'] || ""

        if (key != API_KEY) {
            throw new UnauthorizedException('You need an API Key to use this route!')
        }

        return true
    }
}