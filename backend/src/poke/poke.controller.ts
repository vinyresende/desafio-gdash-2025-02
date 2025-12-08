import { PokeService } from './poke.service'
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common'

@Controller('poke')
export class PokeController {
    constructor (private pokeService: PokeService) {}

    @Get("getall")
    async getall(
        @Query('offset', new ParseIntPipe({ optional: true })) offset?: number,
        @Query('limit', new ParseIntPipe({ optional: true })) limit?: number
    ) {
        return await this.pokeService.getPokemonList(offset, limit)
    }

    @Get("get/:id")
    async getbyid(@Param('id') id: string) {
        const res = await this.pokeService.getPokemon(id)
        return { pokemon: res.data }
    }
}
