import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'

import { DB_URL } from './constants'

@Module({
	imports: [
		AuthModule,
		MongooseModule.forRoot(DB_URL)
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
