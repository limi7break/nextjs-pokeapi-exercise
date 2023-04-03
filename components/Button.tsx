import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean
}

export default function Button({ loading, children, ...rest }: ButtonProps) {
    const { className, ...restWithoutClassName } = rest
    return (
        <button
            className={`${className} ${
                loading ? 'pointer-events-none opacity-50' : ''
            } rounded-md bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            {...restWithoutClassName}
        >
            {children}
        </button>
    )
}
