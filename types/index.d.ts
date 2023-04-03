interface NamedAPIResource {
    name: string
    url: string
}

interface PokemonAbility {
    ability: NamedAPIResource
}

interface PokemonType {
    type: NamedAPIResource
}

interface PokemonSprites {
    front_default: string
}

interface Pokemon {
    id: number
    name: string
    base_experience: number
    abilities: PokemonAbility[]
    types: PokemonType[]
    sprites: PokemonSprites
}

interface Team {
    name: string
    pokemon: Pokemon[]
    created_at: string
}
