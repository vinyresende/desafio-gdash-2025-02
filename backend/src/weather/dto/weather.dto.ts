import { IsString, IsNumber, IsObject } from 'class-validator'

export class InsertWeatherDataDTO {
    @IsString()
    city_name: string

    @IsNumber()
    latitude: number

    @IsNumber()
    longitude: number

    @IsObject()
    current: {
        time: string
        temperature: number
        relative_humidity: number
        apparent_temperature: number
        wind_speed: number
        precipitation_probability: number
        sky_condition: string
    }
}

export class WeatherDTO {
    city_name: string
    latitude: number
    longitude: number
    current: {
        time: string
        temperature: number
        relative_humidity: number
        apparent_temperature: number
        wind_speed: number
        precipitation_probability: number
        sky_condition: string
    }
}
