import { config } from 'dotenv'

config()

export const DB_URL: string = process.env.DB_URL || ""
export const API_KEY: string = process.env.API_KEY || ""
export const JWT_SECRET: string = process.env.JWT_SECRET || ""
export const POKEAPI_URL: string = process.env.POKEAPI_URL || ""