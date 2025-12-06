import { WeatherGuard } from './weather.guard'
import { WeatherService } from './weather.service'
import { InsertWeatherDataDTO } from './dto/weather.dto'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'

@Controller('weather')
export class WeatherController {
    constructor(private weatherService: WeatherService) {}

    @UseGuards(WeatherGuard)
    @Post('save')
    async saveWeatherData(@Body() data: InsertWeatherDataDTO) {
        return await this.weatherService.insertData(data)
    }
}
