"use server"

import axios from "axios"

import type { PokeAPIResponse, Pokemon } from "./types"

const API_URL: string = import.meta.env.VITE_API_URL || ""

export async function getAllPokemon(offset?: number, limit?: number): Promise<{ ok: boolean, data?: PokeAPIResponse, message?: string }> {
    try {
        const params: string = `?${offset ? `offset=${offset}&` : ""}${limit ? `limit=${limit}&` : ""}`
        const res = await axios.get(`${API_URL}/poke/getall${params}`, { headers: { "Authorization": `Bearer ${localStorage.getItem('accessToken')}` } })

        return { ok: true, data: res.data }
    } catch (error) {
        return { ok: false, message: "Erro ao buscar pokemons!" }
    }
}

export async function getPokemon(id: string): Promise<{ ok: boolean, data?: Pokemon, message?: string }> {
    try {
        const res: { data: { pokemon: Pokemon } } = await axios.get(`${API_URL}/poke/get/${id}`, { headers: { "Authorization": `Bearer ${localStorage.getItem('accessToken')}` } })

        return { ok: true, data: res.data.pokemon }
    } catch (error) {
        return { ok: false, message: "Erro ao buscar pokemons!" }
    }
}
