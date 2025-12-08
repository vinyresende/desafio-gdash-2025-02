import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

import type { PokemonListItem } from "@/_services/types"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

interface Props {
    info: PokemonListItem
}

export default function PokemonCard({ info }: Props) {
    return (
        <Card>
            <CardHeader>
                <h3>{info.name}</h3>
            </CardHeader>

            <CardContent className="flex items-center justify-center">
                <img src={info.img} alt={`${info.name}-img`} />
            </CardContent>

            <CardFooter className="flex">
                <Link className="w-full" to={`/pokedex/${info.id}`}>
                    <Button className="w-full cursor-pointer">Ver mais</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}