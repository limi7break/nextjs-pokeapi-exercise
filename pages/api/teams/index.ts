import type { NextApiRequest, NextApiResponse } from 'next'

import clientPromise from '@/lib/mongodb'
import redis from '@/lib/redis'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed.' })
        return
    }

    // Extract fields from the request, and type them
    const { name, pokemon }: { name: string; pokemon: Pokemon[] } = req.body

    if (!name) {
        res.status(400).send({ message: 'The "name" field is required.' })
        return
    }

    if (!pokemon.length) {
        res.status(400).send({ message: 'The team must have at least one Pokémon.' })
        return
    }

    // Look for each Pokémon in the database, fail if not found
    const client = await clientPromise
    for (let i = 0; i < pokemon.length; i++) {
        let item = await client.db().collection<Pokemon>('pokemon').findOne({ id: pokemon[i].id })
        if (!item) {
            res.status(400).send({ message: 'Invalid data.' })
            return
        }
        pokemon[i] = item
    }

    // Save team to database
    const result = await client.db().collection<Team>('teams').insertOne({
        name,
        pokemon,
        created_at: new Date().toISOString(),
    })

    // Invalidate cache
    await redis.del('teams')

    res.status(200).json(result)
}
