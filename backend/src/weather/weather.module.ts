import { Module } from '@nestjs/common'
import { WeatherService } from './weather.service'
import { WeatherController } from './weather.controller'

import { MongooseModule } from '@nestjs/mongoose'
import { Weather, weatherSchema } from 'src/schemas/Weather.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Weather.name, schema: weatherSchema }
    ])
  ],
  controllers: [WeatherController],
  providers: [WeatherService]
})
export class WeatherModule {}
