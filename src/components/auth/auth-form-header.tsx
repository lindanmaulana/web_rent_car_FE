interface AuthFormHeaderProps {
    label?: string
}
export const AuthFormHeader = ({label}: AuthFormHeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h2 className="text-3xl ">🔐 Auth</h2>
            <p className="text-muted-foreground text-sm">{label}</p>
        </div>
    )
}