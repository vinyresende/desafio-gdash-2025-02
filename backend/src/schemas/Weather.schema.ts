import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Weather {
    @Prop({ required: true })
    city_name: string

    @Prop({ required: true })
    latitude: number

    @Prop({ required: true })
    longitude: number

    @Prop(raw({
            time: { type: String },
            temperature: { type: Number },
            relative_humidity: { type: Number },
            apparent_temperature: { type: Number },
            wind_speed: { type: Number },
            precipitation_probability: { type: Number },
            sky_condition: { type: String }
        }))
    current: Record<string, string>
}

export const weatherSchema = SchemaFactory.createForClass(Weather)
