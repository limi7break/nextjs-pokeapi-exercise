import { HTMLAttributes } from 'react'

export default function Header({ children, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { className, ...restWithoutClassName } = rest
    return (
        <div
            className={`${className} flex flex-wrap items-center justify-between`}
            {...restWithoutClassName}
        >
            <h1 className="text-2xl font-bold">{children}</h1>
            <h2 className="opacity-50">Next.js PokéAPI exercise</h2>
        </div>
    )
}
