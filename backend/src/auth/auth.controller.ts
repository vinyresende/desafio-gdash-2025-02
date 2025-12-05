import { UserSignInDTO, UserSignUpDTO } from './dto/user.dto'

import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { Body, Controller, Get, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    @UsePipes(new ValidationPipe())
    async signup(@Body() data: UserSignUpDTO) {
        const user = await this.authService.signup(data)
        return { user }
    }

    @Post('signin')
    @UsePipes(new ValidationPipe())
    async signin(@Body() data: UserSignInDTO) {
        const user = await this.authService.signin(data)
        return { user }
    }

    @UseGuards(AuthGuard)
    @Get('user/profile')
    async userProfile(@Request() request) {
        return request.user
    }
}
