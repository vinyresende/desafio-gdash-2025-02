import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun } from "lucide-react"

export default function HomePage() {
    const weather = {
        "city_name": "Miraí",
        "latitude": -21.1926951,
        "longitude": -42.6244621,
        "current": {
            "time": "2025-12-06T16:15",
            "temperature": 28.3,
            "relative_humidity": 49,
            "apparent_temperature": 28.7,
            "wind_speed": 13.1,
            "precipitation_probability": 3,
            "sky_condition": "Céu limpo"
        },
    }

    const date = new Date(weather.current.time)
    const hours = `${date.getHours()}:${date.getMinutes()}`

    return (
        <main className="flex flex-col items-center">
            <div className="w-full max-w-7xl grid grid-cols-3 gap-3">
                <Card>
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
                                <Sun size={80} />
                                <span className="font-bold">{weather.current.sky_condition}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>
        </main>
    )
}