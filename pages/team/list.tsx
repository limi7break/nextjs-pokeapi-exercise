import { WithId } from 'mongodb'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import Button from '@/components/Button'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import PokemonType from '@/components/PokemonType'
import TeamCard from '@/components/TeamCard'
import clientPromise from '@/lib/mongodb'
import redis from '@/lib/redis'
import { POKEMON_TYPES } from '@/utils/constants'

export const getServerSideProps: GetServerSideProps = async context => {
    // Get teams from redis
    let teams = await redis.get('teams')

    if (!teams) {
        // Get teams from database
        const client = await clientPromise
        teams = JSON.stringify(
            await client.db().collection<Team>('teams').find().sort({ created_at: -1 }).toArray()
        )
        await redis.set('teams', teams)
    }

    // Serialize non-JSON fields like ObjectId and Date
    return {
        props: {
            teams: JSON.parse(teams),
        },
    }
}

export default function TeamList({ teams }: { teams: WithId<Team>[] }) {
    const [filteredTeams, setFilteredTeams] = useState(teams)
    const [showTypeFilter, setShowTypeFilter] = useState(false)
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])

    const toggleShowTypeFilter = (): void => {
        if (showTypeFilter) {
            setSelectedTypes([])
            setShowTypeFilter(false)
        } else {
            setShowTypeFilter(true)
        }
    }

    const isTypeSelected = (type: string): boolean => {
        return selectedTypes.includes(type)
    }

    const toggleSelectedType = (type: string): void => {
        setSelectedTypes(
            selectedTypes.includes(type)
                ? selectedTypes.filter(t => t !== type)
                : [...selectedTypes, type]
        )
    }

    useEffect(() => {
        if (!selectedTypes.length) {
            setFilteredTeams(teams)
            return
        }
        setFilteredTeams(
            teams.filter(team => {
                const teamTypes = team.pokemon
                    .flatMap(({ types }) => types)
                    .map(({ type: { name } }) => name)
                for (let i = 0; i < selectedTypes.length; i++) {
                    if (teamTypes.includes(selectedTypes[i])) {
                        return true
                    }
                }
                return false
            })
        )
    }, [teams, selectedTypes])

    return (
        <>
            <Head>
                <title>Team Listing | Next.js PokéAPI exercise</title>
            </Head>
            <Header>Team Listing</Header>
            <Navigation
                links={[
                    {
                        href: '/team/create',
                        text: 'Create Team',
                    },
                ]}
            />
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Button onClick={toggleShowTypeFilter}>
                    {showTypeFilter ? 'Remove filter' : 'Filter by type'}
                </Button>
                <div>
                    showing {filteredTeams.length} teams out of {teams.length}
                </div>
            </div>
            {showTypeFilter && (
                <div className="flex flex-wrap items-center gap-2">
                    {POKEMON_TYPES.map(type => (
                        <div
                            className={`cursor-pointer ${
                                !isTypeSelected(type) ? 'opacity-50' : ''
                            }`}
                            onClick={() => toggleSelectedType(type)}
                            key={type}
                        >
                            <PokemonType type={type} />
                        </div>
                    ))}
                </div>
            )}
            <div className="flex flex-col gap-4">
                {filteredTeams.map(team => (
                    <TeamCard team={team} key={team._id.toString()} />
                ))}
            </div>
        </>
    )
}
