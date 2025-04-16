import { ReactNode } from "react"
import { AuthSocial } from "./auth-social"
import { AuthBackButton } from "./auth-back-button"
import { AuthFormHeader } from "./auth-form-header"

interface AuthFormProps {
    children: ReactNode
    showSocial?: boolean
    backButtonHref: string
    backButtonLabel: string
    headerLabel?: string
}
export const AuthForm = ({children, showSocial, backButtonHref, backButtonLabel, headerLabel}: AuthFormProps) => {
    return (
        <div className="space-y-4 w-[440px] px-4">
            <AuthFormHeader label={headerLabel} />
          {children}
          {showSocial && <AuthSocial />}
          <AuthBackButton href={backButtonHref} label={backButtonLabel} />
        </div>
    )
}