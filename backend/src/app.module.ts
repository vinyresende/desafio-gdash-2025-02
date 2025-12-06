import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'

import { DB_URL } from './constants'
import { WeatherModule } from './weather/weather.module';

@Module({
	imports: [
		AuthModule,
		MongooseModule.forRoot(DB_URL),
		WeatherModule
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
