import { ReactNode } from "react"

interface NavbarListProps {
    children: ReactNode
}
export const NavbarList = ({children}: NavbarListProps) => {
    return (
        <ul className="flex flex-col gap-5">
            {children}
        </ul>
    )
}