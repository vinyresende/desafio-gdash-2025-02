import { config } from 'dotenv'

config()

export const DB_URL: string = process.env.DB_URL || ""
export const JWT_SECRET: string = process.env.JWT_SECRET || ""