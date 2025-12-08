import axios from 'axios'
import { Injectable } from '@nestjs/common'

import { POKEAPI_URL } from 'src/constants'

import { PokeAPIResponse } from './dto/poke.dto'

@Injectable()
export class PokeService {

    async getPokemonList(offset?: number, limit?: number) {
        const params: string = `?${offset ? `offset=${offset}&` : ""}${limit ? `limit=${limit}&` : ""}`
        const res: { data: PokeAPIResponse } = await axios.get(`${POKEAPI_URL}/pokemon${params}`)

        return {
            count: res.data.count,
            results: res.data.results.map(item => {
                const id = item.url.split('/').at(-2)
                return {
                    id: id,
                    name: item.name,
                    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                }
            })
        }
    }

    async getPokemon(id: string) {
        const res = await axios.get(`${POKEAPI_URL}/pokemon/${id}`)
        return res
    }
}
