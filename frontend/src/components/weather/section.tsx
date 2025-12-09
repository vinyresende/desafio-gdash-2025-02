import WeatherRecordCard from "./current"
import WeatherInsightsCard from "./insights"

import { useEffect, useState } from "react"
import { getInsights, getRecord } from "@/_services/weather/weather"

import type { WeatherRecord } from "@/_services/weather/types"

export default function WeatherSection() {
    const [weather, setWeather] = useState<WeatherRecord | null>(null)
    const [weatherError, setWeatherError] = useState<string | null>(null)

    const [insights, setInsights] = useState<string | null>(null)
    const [insightsError, setInsightsError] = useState<string | null>(null)

    const fetchWeatherRecord = async (): Promise<void> => {
        const res = await getRecord()

        if (!res.ok) {
            setWeather(null)
            return setWeatherError(res.message!)
        }

        setWeatherError(null)
        setWeather(res.data!)
    }

    const fetchWeatherInsights = async (): Promise<void> => {
        const res = await getInsights()

        if (!res.ok) {
            setInsights(null)
            return setInsightsError(res.message!)
        }

        setInsightsError(null)
        setInsights(res.data!)
    }

    useEffect(() => {
        fetchWeatherRecord()
        fetchWeatherInsights()
    }, [])

    return (
        <section className="w-full max-w-7xl grid grid-cols-3 gap-3">
            <div><WeatherRecordCard weather={weather} weatherError={weatherError} /></div>
            <WeatherInsightsCard insights={insights} insightsError={insightsError} />
        </section>
    )
}