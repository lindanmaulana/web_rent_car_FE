interface NavbarHeaderProps {
    title: string
}
export const NavbarHeader = ({title}: NavbarHeaderProps) => {
    return (
        <h3 className="text-[#94A7CB]/40">
            {title}
        </h3>
    )
}