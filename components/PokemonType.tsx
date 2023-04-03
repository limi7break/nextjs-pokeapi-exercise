import { HTMLAttributes } from 'react'

interface PokemonTypeProps extends HTMLAttributes<HTMLSpanElement> {
    type: string
}

export default function PokemonType({ type, ...rest }: PokemonTypeProps) {
    const { className, ...restWithoutClassName } = rest
    return (
        <span
            className={`${className} ${type} type select-none rounded-md border-2 border-black px-2 py-0.5 text-white`}
            {...restWithoutClassName}
        />
    )
}
