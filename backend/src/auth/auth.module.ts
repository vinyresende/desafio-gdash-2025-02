import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthController } from './auth.controller'
import { User, UserSchema } from 'src/schemas/User.schema'

import { JWT_SECRET } from 'src/constants'

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: JWT_SECRET
		}),
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema }
		])
	],
	controllers: [AuthController],
	providers: [AuthService]
})
export class AuthModule { }
