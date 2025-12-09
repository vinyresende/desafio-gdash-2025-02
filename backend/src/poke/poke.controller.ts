import { AuthGuard } from 'src/auth/auth.guard'
import { PokeService } from './poke.service'
import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common'

@Controller('poke')
export class PokeController {
    constructor (private pokeService: PokeService) {}

    @UseGuards(AuthGuard)
    @Get("getall")
    async getall(
        @Query('offset', new ParseIntPipe({ optional: true })) offset?: number,
        @Query('limit', new ParseIntPipe({ optional: true })) limit?: number
    ) {
        return await this.pokeService.getPokemonList(offset, limit)
    }

    @UseGuards(AuthGuard)
    @Get("get/:id")
    async getbyid(@Param('id') id: string) {
        const res = await this.pokeService.getPokemon(id)
        return { pokemon: res.data }
    }
}
