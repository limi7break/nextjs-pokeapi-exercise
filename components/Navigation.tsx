import Link from 'next/link'
import { HTMLAttributes } from 'react'

interface NavigationLink {
    text: string
    href: string
}

interface NavigationProps extends HTMLAttributes<HTMLDivElement> {
    links: NavigationLink[]
}

export default function Navigation({ links, ...rest }: NavigationProps) {
    const { className, ...restWithoutClassName } = rest
    return (
        <div className={`${className} flex flex-wrap items-center gap-4`} {...restWithoutClassName}>
            {links.map((link, index) => (
                <Link
                    href={link.href}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    key={link.href + index}
                >
                    {link.text}
                </Link>
            ))}
        </div>
    )
}
