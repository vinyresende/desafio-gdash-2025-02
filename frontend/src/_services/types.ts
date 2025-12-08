export interface PokeAPIResponse {
    count: number
    results: PokemonListItem[]
}

export interface PokemonListItem {
    id: string
    name: string
    img: string
}

interface NamedAPIResource {
    name: string
    url: string
}

interface VersionGameIndex {
    game_index: number
    version: NamedAPIResource
}

interface PokemonAbility {
    is_hidden: boolean
    slot: number
    ability: NamedAPIResource
}

interface PokemonType {
    slot: number
    type: NamedAPIResource
}

interface PokemonTypePast {
    generation: NamedAPIResource
    types: PokemonType[]
}

interface PokemonAbilityPast {
    generation: NamedAPIResource
    abilities: PokemonAbility[]
}

interface PokemonHeldItemVersion {
    version: NamedAPIResource
    rarity: number
}

interface PokemonHeldItem {
    item: NamedAPIResource
    version_details: PokemonHeldItemVersion[]
}

interface PokemonMoveVersion {
    move_learn_method: NamedAPIResource
    version_group: NamedAPIResource
    level_learned_at: number
    version_group_details: PokemonMoveVersion[]
}

interface PokemonMove {
    move: NamedAPIResource
    version_group_details: PokemonMoveVersion[]
}

interface PokemonStat {
    stat: NamedAPIResource
    effort: number
    base_stat: number
}

interface PokemonSprites {
    front_default: string | null
    front_shiny: string | null
    front_female: string | null
    front_shiny_female: string | null
    back_default: string | null
    back_shiny: string | null
    back_female: string | null
    back_shiny_female: string | null
    versions: {
        'generation-i': {
            'red-blue': {
                front_default: string | null
            }
            yellow: {
                front_default: string | null
                front_gray: string | null
                front_transparent: string | null
                back_default: string | null
                back_gray: string | null
                back_transparent: string | null
            }
        }
        'generation-ii': {
            crystal: {
                front_default: string | null
                back_default: string | null
                front_shiny: string | null
                back_shiny: string | null
            }
            gold: {
                front_default: string | null
                back_default: string | null
                front_shiny: string | null
                back_shiny: string | null
            }
            silver: {
                front_default: string | null
                back_default: string | null
                front_shiny: string | null
                back_shiny: string | null
            }
        }
        'generation-iii': {
            emerald: {
                front_default: string | null
                front_shiny: string | null
                back_default: string | null
                back_shiny: string | null
            }
            'firered-leafgreen': {
                front_default: string | null
                front_shiny: string | null
                back_default: string | null
                back_shiny: string | null
            }
            'ruby-sapphire': {
                front_default: string | null
                front_shiny: string | null
                back_default: string | null
                back_shiny: string | null
            }
        }
        'generation-iv': {
            'diamond-pearl': {
                front_default: string | null
                front_shiny: string | null
                back_default: string | null
                back_shiny: string | null
            }
            'heartgold-soulsilver': {
                front_default: string | null
                front_shiny: string | null
                back_default: string | null
                back_shiny: string | null
            }
            platinum: {
                front_default: string | null
                front_shiny: string | null
                back_default: string | null
                back_shiny: string | null
            }
        }
        'generation-v': {
            'black-white': {
                animated: {
                    front_default: string | null
                    front_shiny: string | null
                    back_default: string | null
                    back_shiny: string | null
                }
                front_default: string | null
                front_shiny: string | null
                back_default: string | null
                back_shiny: string | null
            }
        }
        'generation-vi': {
            'omegaruby-alphasapphire': {
                front_default: string | null
                front_shiny: string | null
                back_default: string | null
                back_shiny: string | null
            }
            'x-y': {
                front_default: string | null
                front_shiny: string | null
                back_default: string | null
                back_shiny: string | null
            }
        }
        'generation-vii': {
            icons: {
                front_default: string | null
                front_shiny: string | null
            }
            'ultra-sun-ultra-moon': {
                front_default: string | null
                front_shiny: string | null
                back_default: string | null
                back_shiny: string | null
            }
        }
        'generation-viii': {
            icons: {
                front_default: string | null
                front_shiny: string | null
            }
        }
        'generation-ix': {
            'scarlet-violet': {
                front_default: string | null
                front_shiny: string | null
                back_default: string | null
                back_shiny: string | null
            }
        }
    } | null
    other: {
        dream_world: {
            front_default: string | null
            front_female: string | null
        }
        'official-artwork': {
            front_default: string | null
        }
        home: {
            front_default: string | null
            front_female: string | null
            front_shiny: string | null
            front_shiny_female: string | null
        }
    } | null
}

interface PokemonCries {
    latest: string
    legacy: string | null
}

// Interface principal para Pokémon
export interface Pokemon {
    id: number
    name: string
    base_experience: number
    height: number
    is_default: boolean
    order: number
    weight: number
    abilities: PokemonAbility[]
    forms: NamedAPIResource[]
    game_indices: VersionGameIndex[]
    held_items: PokemonHeldItem[]
    location_area_encounters: string
    moves: PokemonMove[]
    past_types: PokemonTypePast[]
    past_abilities: PokemonAbilityPast[]
    sprites: PokemonSprites
    cries: PokemonCries
    species: NamedAPIResource
    stats: PokemonStat[]
    types: PokemonType[]
}
