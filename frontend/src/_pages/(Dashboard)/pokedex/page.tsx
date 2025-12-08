import { useEffect, useState } from "react"
import { getAllPokemon } from "@/_services/pokedex"

import Pagination from "@/components/pagination/pagination"

import type { PokemonListItem } from "@/_services/types"
import PokemonCard from "@/components/pokemon/pokemon-card"

const ITEMS_PER_PAGE: number = 16

export default function PokedexPage() {
    const [pokemonList, setPokemonList] = useState<PokemonListItem[] | undefined>(undefined)

    const [page, setPage] = useState<number>(1)
    const [totalItems, setTotalItems] = useState<number>(0)

    const fetchPokemonList = async () => {
        const offset: number = (page - 1) * ITEMS_PER_PAGE
        const res = await getAllPokemon(offset, ITEMS_PER_PAGE)

        if (res.ok) {
            setTotalItems(res.data!.count)
            return setPokemonList(res.data!.results)
        }

        return setPokemonList(undefined)
    }

    useEffect(() => {
        fetchPokemonList()
    }, [page])

    return (
        <main>
            <section className="w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-3">
                    {pokemonList?.map(item => (
                        <PokemonCard key={item.id} info={item} />
                    ))}
                </div>

                <div className="flex items-center justify-center mt-6">
                    <Pagination totalPages={totalItems / ITEMS_PER_PAGE} setPage={setPage} currentPage={page} />
                </div>
            </section>
        </main>
    )
}