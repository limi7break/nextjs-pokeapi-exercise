/**
 * Gets a random element from arr.
 */
export function sample<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Converts kebab-case to Start Case.
 * Used for formatting Pokémon names and ability names.
 */
export function kebabCaseToStartCase(s: string): string {
    return s.split('-').map(capitalizeFirst).join(' ')
}

/**
 * Capitalizes the first character of a string.
 */
export function capitalizeFirst(s: string): string {
    return s.charAt(0).toUpperCase() + s.substring(1)
}
