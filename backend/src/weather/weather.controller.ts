import { WeatherGuard } from './weather.guard'
import { WeatherService } from './weather.service'
import { InsertWeatherDataDTO } from './dto/weather.dto'
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('weather')
export class WeatherController {
    constructor(private weatherService: WeatherService) {}

    @UseGuards(WeatherGuard)
    @Post('save')
    async saveWeatherData(@Body() data: InsertWeatherDataDTO) {
        return await this.weatherService.insertData(data)
    }

    @UseGuards(AuthGuard)
    @Get('getrecord')
    async getRecord() {
        const res = await this.weatherService.getLast()
        return { data: res }
    }

    @UseGuards(AuthGuard)
    @Get('getinsights')
    async getInsights() {
        const data = await this.weatherService.getInsights()
        return { data }
    }
}
