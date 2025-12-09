import { Badge } from "../ui/badge"
import { Skeleton } from "../ui/skeleton"
import { weatherConditionIcons } from "./icons"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

import { Cloud, type LucideProps } from "lucide-react"
import type { WeatherRecord } from "@/_services/weather/types"

interface Props {
    weather: WeatherRecord | null
    weatherError: string | null
}

export default function WeatherRecordCard({ weather, weatherError }: Props) {
    const date: Date | undefined = weather ? new Date(weather.current.time) : undefined
    const hours: string | undefined = date ? `${date.getHours()}:${date.getMinutes()}` : undefined

    const Icon: React.FC<LucideProps> = weather ? weatherConditionIcons[weather?.current.sky_condition] : Cloud

    return (
        <>
            {(!weather && !weatherError) ? (
                <Skeleton className="h-[210px] rounded-lg"></Skeleton>
            ) : (
                <Card className="sticky top-0">
                    {weatherError && (
                        <Badge variant="destructive" className="mx-auto px-10">{weatherError}</Badge>
                    )}

                    {weather && (
                        <>
                            <CardHeader className="flex items-center justify-between">
                                <CardTitle>{weather.city_name}</CardTitle>
                                <span>{hours}</span>
                            </CardHeader>

                            <CardContent className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col gap-2">
                                    <span className="text-5xl">{weather.current.temperature}º</span>

                                    <div className="flex flex-col [&_span]:text-[12px]">
                                        <span><strong className="text-muted-foreground">Sensação térmica:</strong> {weather.current.apparent_temperature}º</span>
                                        <span><strong className="text-muted-foreground">Velocidade do vento:</strong> {weather.current.wind_speed} km/h</span>
                                        <span><strong className="text-muted-foreground">Umidade relativa:</strong> {weather.current.relative_humidity}%</span>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col items-end">
                                    <div className="flex flex-col gap-2">
                                        <Icon size={80} />
                                        <span className="font-bold">{weather.current.sky_condition}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </>
                    )}
                </Card>
            )}
        </>
    )
}