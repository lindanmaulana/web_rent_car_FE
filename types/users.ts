export interface UserGithub {
    id: string
    name: string
    email: string
    image: string
    provider: string
    providerAccountId: string
}

export type GithubProfile = {
    id: number
    login: string
    name: string | null
    email: string | null
    avatar_url: string
}

// id?: string
// name?: string;
// email: string;
// password?: string;
// emailVerified?: Date
// image?: string
// role?: UserRole
// provider?: string
// providerAccountId?: string