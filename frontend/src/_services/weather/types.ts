export interface WeatherRecord {
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