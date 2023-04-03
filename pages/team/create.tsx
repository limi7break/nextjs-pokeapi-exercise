import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

import Button from '@/components/Button'
import Header from '@/components/Header'
import InputField from '@/components/InputField'
import Navigation from '@/components/Navigation'
import PokemonCard from '@/components/PokemonCard'

export default function TeamCreate() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [pokemon, setPokemon] = useState<Pokemon[]>([])

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
            .post('/api/teams', {
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
                <title>Create Team | Next.js PokéAPI exercise</title>
            </Head>
            <Header>Create Team</Header>
            <Navigation
                links={[
                    {
                        href: '/team/list',
                        text: 'Team Listing',
                    },
                ]}
            />
            <div className="flex flex-wrap items-center justify-between gap-4">
                <InputField
                    placeholder="Name"
                    required
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
