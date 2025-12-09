"use server"

import axios from "axios"
import type { WeatherRecord } from "./types"

const API_URL: string = import.meta.env.VITE_API_URL

export async function getRecord(): Promise<{ ok: boolean, data?: WeatherRecord, message?: string }> {
    try {
        const res: { data: { data: WeatherRecord } } = await axios.get(
            `${API_URL}/weather/getrecord`,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('accessToken')}` } }
        )

        return { ok: true, data: res.data.data }
    } catch (error) {
        return { ok: false, message: "Erro ao buscar dados climáticos!" }
    }
}

export async function getInsights(): Promise<{ ok: boolean, data?: string, message?: string }> {
    try {
        const res: { data: { data: string } } = await axios.get(
            `${API_URL}/weather/getinsights`,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('accessToken')}` } }
        )

        return { ok: true, data: res.data.data }
    } catch (error) {
        return { ok: false, message: "Erro ao buscar Insights!" }
    }
}
