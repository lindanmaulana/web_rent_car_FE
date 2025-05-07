import { AuthRole } from "./auth"

export type Token = {
    id: string
    name: string
    email: string
    role: AuthRole
    image: string
    token: string
    accessTokenExpiresIn: number
}