import { InputHTMLAttributes } from 'react'

export default function InputField({ children, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    const { className, ...restWithoutClassName } = rest
    return (
        <input
            type="text"
            className={`${className} rounded-md border border-gray-300 bg-gray-50 px-2.5 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
            {...restWithoutClassName}
        />
    )
}
