import { WithId } from 'mongodb'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

import DateTime from '@/components/DateTime'
import PokemonType from '@/components/PokemonType'

interface TeamCardProps extends HTMLAttributes<HTMLAnchorElement> {
    team: WithId<Team>
}

export default function TeamCard({ team, ...rest }: TeamCardProps) {
    const { className, ...restWithoutClassName } = rest

    let total_experience = 0
    let sprites: NamedAPIResource[] = []
    let types: Set<string> = new Set()

    team.pokemon.forEach(pokemon => {
        total_experience += pokemon.base_experience
        sprites = [...sprites, { name: pokemon.name, url: pokemon.sprites.front_default }]
        pokemon.types.forEach(({ type }) => types.add(type.name))
    })

    return (
        <Link
            href={`/team/${team._id}/edit`}
            className={`${className} flex flex-col rounded-md border border-gray-200 bg-white p-4 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`}
            {...restWithoutClassName}
        >
            <div className="-mt-1 flex flex-wrap items-center justify-between">
                <div className="font-semibold">{team.name}</div>
                <div className="flex items-center gap-1 text-sm opacity-50">
                    created
                    <DateTime dateString={team.created_at} />
                </div>
            </div>
            <div className="text-sm">{total_experience} total base exp.</div>
            <div className="flex flex-wrap items-center py-4">
                {sprites.map((sprite, index) => (
                    <img
                        className="animate-sprite"
                        src={sprite.url}
                        alt={sprite.name}
                        key={index}
                        width={72}
                        height={72}
                    />
                ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
                {Array.from(types).map(type => (
                    <PokemonType type={type} key={type} />
                ))}
            </div>
        </Link>
    )
}
