import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
    return <div className="mx-auto flex max-w-[800px] flex-col gap-4 p-4">{children}</div>
}
