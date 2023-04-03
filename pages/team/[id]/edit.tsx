import { ParsedUrlQuery } from 'querystring'

import axios from 'axios'
import { ObjectId } from 'mongodb'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

import Button from '@/components/Button'
import Header from '@/components/Header'
import InputField from '@/components/InputField'
import Navigation from '@/components/Navigation'
import PokemonCard from '@/components/PokemonCard'
import clientPromise from '@/lib/mongodb'

interface Params extends ParsedUrlQuery {
    id: string
}

export const getServerSideProps: GetServerSideProps = async context => {
    const { id } = context.params as Params

    // Get team from database
    const client = await clientPromise
    const team = await client
        .db()
        .collection('teams')
        .findOne({ _id: new ObjectId(id) })

    // Serialize non-JSON fields like ObjectId and Date
    return {
        props: {
            id,
            team: JSON.parse(JSON.stringify(team)),
        },
    }
}

export default function TeamEdit({ id, team }: { id: string; team: Team }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(team.name)
    const [pokemon, setPokemon] = useState<Pokemon[]>(team.pokemon)

    async function gottaCatchEmAll() {
        setLoading(true)
        axios
            .get('/api/pokemon/random')
            .then(({ data }) => setPokemon(pokemon => [data, ...pokemon]))
            .catch(error => alert(error.response.data.message))
            .finally(() => setLoading(false))
    }

    async function save() {
        setLoading(true)
        axios
            .put(`/api/teams/${id}`, {
                name,
                pokemon,
            })
            .then(() => router.push('/team/list'))
            .catch(error => alert(error.response.data.message))
            .finally(() => setLoading(false))
    }

    return (
        <>
            <Head>
                <title>Team Edit | Next.js PokéAPI exercise</title>
            </Head>
            <Header>Team Edit</Header>
            <Navigation
                links={[
                    {
                        href: '/team/list',
                        text: 'Team Listing',
                    },
                    {
                        href: '/team/create',
                        text: 'Create Team',
                    },
                ]}
            />
            <div className="flex flex-wrap items-center justify-between gap-4">
                <InputField
                    placeholder="Name"
                    required
                    value={name}
                    onChange={e => setName(() => e.target.value)}
                />
                <Button onClick={save} loading={loading} disabled={loading}>
                    Save
                </Button>
            </div>
            <Button onClick={gottaCatchEmAll} loading={loading} disabled={loading}>
                Gotta Catch &#39;Em All!
            </Button>
            <div className="flex flex-wrap gap-4">
                {pokemon.map(pokemon => (
                    <PokemonCard pokemon={pokemon} key={pokemon.id} />
                ))}
            </div>
        </>
    )
}
