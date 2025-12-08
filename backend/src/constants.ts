import { config } from 'dotenv'

import { User } from './schemas/User.schema'

config()

export const DB_URL: string = process.env.DB_URL || ""
export const API_KEY: string = process.env.API_KEY || ""
export const JWT_SECRET: string = process.env.JWT_SECRET || ""
export const POKEAPI_URL: string = process.env.POKEAPI_URL || ""

export const DEFAULT_USER: User = {
    username: process.env.DEFAULT_USER_USERNAME || "Admin",
    email: process.env.DEFAULT_USER_EMAIL || "admin@email.com",
    password: process.env.DEFAULT_USER_PASSWORD || "admin123",
}
