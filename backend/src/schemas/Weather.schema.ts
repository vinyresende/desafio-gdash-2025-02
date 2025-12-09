import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose"

class CurrentWeather {
    @Prop({ required: true })
    time: string

    @Prop({ required: true })
    temperature: number

    @Prop({ required: true })
    relative_humidity: number

    @Prop({ required: true })
    apparent_temperature: number

    @Prop({ required: true })
    wind_speed: number

    @Prop({ required: true })
    precipitation_probability: number

    @Prop({ required: true })
    sky_condition: string
}

@Schema()
export class Weather {
    @Prop({ required: true })
    city_name: string

    @Prop({ required: true })
    latitude: number

    @Prop({ required: true })
    longitude: number

    @Prop({ required: true })
    current: CurrentWeather
}

export const weatherSchema = SchemaFactory.createForClass(Weather)
