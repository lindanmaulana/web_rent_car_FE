import { ReactNode } from "react";

export interface SectionProps {
    children: ReactNode
}

export const Section = ({children}: SectionProps) => {
    return (
        <section>
            {children}
        </section>
    )
}