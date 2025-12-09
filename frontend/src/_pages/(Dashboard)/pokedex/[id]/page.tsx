import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPokemon } from "@/_services/pokedex/pokedex"

import type { Pokemon } from "@/_services/pokedex/types"

export default function SinglePokemonPage() {
    const { id } = useParams()

    const [pokemon, setPokemon] = useState<Pokemon | null>(null)

    const fetchPokemon = async () => {
        const res = await getPokemon(id || "")

        if (res.ok) {
            return setPokemon(res.data!)
        }

        return setPokemon(null)
    }

    useEffect(() => {
        fetchPokemon()
    }, [])

    return (
        <main className="flex flex-col">
            {pokemon && (
                <section className="w-full max-w-7xl border rounded-md mx-auto gap-5 p-5">
                    <h1 className="font-bold text-2xl mb-5">{pokemon?.name[0].toUpperCase()}{pokemon?.name.slice(1)}</h1>

                    <div className="grid grid-cols-2 max-lg:grid-cols-1">
                        <div className="flex flex-col max-lg:order-2">
                            <span className="text-muted-foreground">
                                <strong className="text-white">Nome:</strong> {pokemon!.name}
                            </span>

                            <span className="text-muted-foreground">
                                <strong className="text-white">Tipos:</strong> {pokemon!.types.map(t => t.type.name).join(', ')}
                            </span>

                            <span className="text-muted-foreground">
                                <strong className="text-white">Peso:</strong> {pokemon!.weight / 10} Kg
                            </span>

                            <span className="text-muted-foreground">
                                <strong className="text-white">Habilidades:</strong> {pokemon!.abilities.map(a => a.ability.name).join(", ")}
                            </span>

                            <span className="text-muted-foreground mt-5">
                                <strong className="text-white">Movimentos:</strong> {pokemon!.moves.map(m => m.move.name).join(', ')}
                            </span>
                        </div>

                        <div className="flex justify-end max-lg:justify-center max-lg:order-1">
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`}
                                className="w-60 h-60 border rounded-md"
                                alt=""
                            />
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}