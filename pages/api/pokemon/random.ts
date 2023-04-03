import fs from 'fs'
import path from 'path'

import type { NextApiRequest, NextApiResponse } from 'next'

import clientPromise from '@/lib/mongodb'
import { getRandomPokemon } from '@/lib/pokeapi'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req

    if (method !== 'GET') {
        res.status(405).send({ message: 'Only GET requests allowed.' })
        return
    }

    let pokemon = await getRandomPokemon()

    // Save sprite image, if it doesn't already exist
    const imagePath = path.join(process.cwd(), 'sprites', `${pokemon.id}.png`)
    if (!fs.existsSync(imagePath)) {
        const response = await fetch(pokemon.sprites.front_default)
        const buffer = await response.arrayBuffer()
        const uint8Array = new Uint8Array(buffer)
        const imageBuffer = Buffer.from(uint8Array)
        fs.writeFileSync(imagePath, imageBuffer)
    }

    // Rebuild object to keep only relevant properties
    pokemon = {
        id: pokemon.id,
        name: pokemon.name,
        base_experience: pokemon.base_experience,
        abilities: pokemon.abilities,
        types: pokemon.types,
        sprites: {
            // Update sprite URL
            front_default: path.join('/', 'api', 'sprites', `${pokemon.id}.png`),
        },
    }

    // Upsert Pokémon to database
    const client = await clientPromise
    await client
        .db()
        .collection('pokemon')
        .updateOne({ id: pokemon.id }, { $set: pokemon }, { upsert: true })

    res.status(200).json(pokemon)
}
