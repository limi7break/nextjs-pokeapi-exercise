import { format, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'

export default function Date({ dateString }: { dateString: string }) {
    const date = parseISO(dateString)
    const [formattedDate, setFormattedDate] = useState('')

    useEffect(() => setFormattedDate(format(date, 'LLLL d, yyyy, HH:mm:ss')), [date])

    return <time dateTime={dateString}>{formattedDate}</time>
}
