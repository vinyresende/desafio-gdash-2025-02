import axios from 'axios'

import { Model } from 'mongoose'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { GEMINI_API } from 'src/constants'
import { Weather } from 'src/schemas/Weather.schema'
import { InsertWeatherDataDTO, WeatherDTO } from './dto/weather.dto'

@Injectable()
export class WeatherService {
    constructor(@InjectModel(Weather.name) private weatherModel: Model<Weather>) { }

    async insertData(data: InsertWeatherDataDTO) {
        const weatherData = new this.weatherModel(data)
        await weatherData.save()

        return { message: "Added successfully!" }
    }

    async getLast() {
        const weather: WeatherDTO | null = await this.weatherModel
            .findOne()
            .sort({ "current.time": -1 })
            .lean()
            .exec()

        return weather
    }

    async getInsights() {
        try {
            const weather: WeatherDTO[] = await this.weatherModel
                .find()
                .sort({ "current.time": -1 })
                .limit(5)
                .lean()
                .exec()
            return this.genAIResponse(weather)
        } catch (error) {
            throw error
        }
    }

    private async genAIResponse(weather: WeatherDTO[]) {
        const reverseTimeline: WeatherDTO[] = weather.sort((a, b) => {
            return new Date(a.current.time).getTime() - new Date(b.current.time).getTime()
        })

        const trends = {
            temperature_trend: this.calculateTrend(reverseTimeline.map(d => d.current.temperature)),
            humidity_trend: this.calculateTrend(reverseTimeline.map(d => d.current.relative_humidity)),
            wind_trend: this.calculateTrend(reverseTimeline.map(d => d.current.wind_speed)),
            // has_precipitation: reverseTimeline.some(d => d.current.precipitation_probability > 0)
        }

        const prompt = `
            ANÁLISE CLIMÁTICA TEMPORAL - ${weather[0].city_name}

            CONTEXTO:
            Você é um meteorologista especializado. Analise os dados climáticos das últimas ${weather.length} observações para identificar padrões e fazer projeções.

            LOCALIZAÇÃO:
            • Cidade: ${weather[0].city_name}
            • Latitude: ${weather[0].latitude}
            • Longitude: ${weather[0].longitude}

            LINHA DO TEMPO (ÚLTIMAS ${weather.length} OBSERVAÇÕES):
            ${reverseTimeline.map(i => i.current.time).join(" - ")}

            DADOS ATUAIS (MAIS RECENTE):
            • Hora da Observação: ${new Date(weather[0].current.time).toLocaleString('pt-BR')}
            • Temperatura: ${weather[0].current.temperature}°C
            • Sensação Térmica: ${weather[0].current.apparent_temperature}°C
            • Umidade: ${weather[0].current.relative_humidity}%
            • Vento: ${weather[0].current.wind_speed} km/h
            • Probabilidade de Chuva: ${weather[0].current.precipitation_probability}%
            • Condição do Céu: ${weather[0].current.sky_condition}

            TENDÊNCIAS DAS ÚLTIMAS ${reverseTimeline.length + 1} OBSERVAÇÕES:
            1. Temperatura: ${trends.temperature_trend}
            2. Umidade: ${trends.humidity_trend}
            3. Velocidade do Vento: ${trends.wind_trend}

            TAREFAS DE ANÁLISE:
            1. Analise a evolução das condições climáticas nas últimas horas
            2. Identifique padrões significativos (ex: aquecimento/resfriamento)
            3. Avalie se as condições estão se estabilizando ou mudando rapidamente
            4. Com base nas tendências, projete o cenário para as próximas 3-6 horas
            5. Forneça recomendações práticas (ex: necessidade de guarda-chuva, roupas adequadas)

            FORMATO DA RESPOSTA:
            - É indispensável que a resposta seja em forma de trecho de HTML com títulos em H3 sem classes nem ids
            - Toda listagem que existir nos trechos deve ser apresentada com \`<ul>\` e \`<li>\`
            - Sempre que quiser mostrar algo que não seja título em negrito, utilize \`<b>\` ao invés de \`**\`
            - apresente os textos de corpo como \`<p>\`
            - Nunca mostre as coordenadas da cidade na resposta
            - Resumo executivo (2-3 frases)
            - Análise detalhada das tendências
            - Projeção para próximas horas
            - Recomendações práticas

            ANÁLISE REQUERIDA:
        `

        try {
            const res = await axios.post(
                GEMINI_API.API_URL,
                {
                    system_instruction: {
                        parts: [
                            { text: "Você é um profissional experiente em análise climática e meteorologia" }
                        ]
                    },
                    contents: {
                        parts: [{ text: prompt }]
                    },
                    generationConfig: {
                        temperature: 1.0
                    }
                },
                {
                    headers: {
                        "x-goog-api-key": GEMINI_API.API_KEY,
                        "Content-Type": "application/json"
                    }
                },
            )

            return res.data.candidates[0].content.parts[0].text.replace("```", "").replace("html", "")
        } catch (error) {
            throw new InternalServerErrorException("Erro ao gerar insights!")
        }
    }

    private calculateTrend(values: number[]) {
        const first: number = values[0]
        const last: number = values[values.length - 1]
        const diff: number = last - first

        if (diff > 2) return "Aumentando significativamente"
        if (diff > 0.5) return "Aumentando levemente"
        if (diff < -2) return "Diminuindo significativamente"
        if (diff < -0.5) return "Diminuindo levemente"
        return "Estável"
    }

}
