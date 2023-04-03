import { HTMLAttributes } from 'react'

import PokemonType from '@/components/PokemonType'
import { kebabCaseToStartCase } from '@/utils'

interface PokemonCardProps extends HTMLAttributes<HTMLDivElement> {
    pokemon: Pokemon
}

export default function PokemonCard({ pokemon, ...rest }: PokemonCardProps) {
    const { className, ...restWithoutClassName } = rest
    const hasBaseExperience = Boolean(pokemon.base_experience)

    return (
        <div
            className={`${className} flex flex-col gap-2 rounded-md border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800`}
            {...restWithoutClassName}
        >
            <div>
                <div className="-mt-1 font-semibold">{kebabCaseToStartCase(pokemon.name)}</div>
                {hasBaseExperience && (
                    <div className="text-sm">{pokemon.base_experience} base exp.</div>
                )}
            </div>
            <img
                className="animate-sprite"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={96}
                height={96}
            />
            <ul className="list-inside list-disc text-sm">
                {pokemon.abilities.map(({ ability: { name } }, index) => (
                    <li key={name + index}>{kebabCaseToStartCase(name)}</li>
                ))}
            </ul>
            <div className="my-auto"></div>
            <div className="flex flex-wrap items-center gap-2">
                {pokemon.types.map(({ type: { name } }) => (
                    <PokemonType type={name} key={name} />
                ))}
            </div>
        </div>
    )
}
