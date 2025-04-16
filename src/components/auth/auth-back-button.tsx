import Link from "next/link"
import { Button } from "../ui/button"

interface AuthBackButtonProps {
    href: string
    label: string
}
export const AuthBackButton = ({href, label}: AuthBackButtonProps) => {
    return (
        <Button variant="link" className="w-full font-normal" size="sm" asChild>
            <Link href={href}>{label}</Link>
        </Button>
    )
}