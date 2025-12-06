import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { Injectable } from '@nestjs/common'
import { Weather } from 'src/schemas/Weather.schema'
import { InsertWeatherDataDTO } from './dto/weather.dto'

@Injectable()
export class WeatherService {
    constructor (@InjectModel(Weather.name) private weatherModel: Model<Weather>) {}

    async insertData(data: InsertWeatherDataDTO) {
        const weatherData = new this.weatherModel(data)
        await weatherData.save()

        return { message: "Added successfully!" }
    }
}
