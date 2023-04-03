import axios from 'axios'

import { sample } from '@/utils'

export async function getTotalPokemonCount(): Promise<number> {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1')
    return data.count
}

export async function getAllPokemonURLs(): Promise<string[]> {
    const count = await getTotalPokemonCount()
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${count}`)
    return data.results.map(({ url }: NamedAPIResource) => url)
}

export async function getRandomPokemon(): Promise<Pokemon> {
    const urls = await getAllPokemonURLs()
    const url = sample(urls)
    const { data } = await axios.get(url)
    return data
}
