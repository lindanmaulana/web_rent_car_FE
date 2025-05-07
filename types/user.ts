export type UserRole = "ADMIN" | "USER"

export interface User {
    id: string;
    name?: string;
    email: string;
    password?: string;
    emailVerified?: Date
    image?: string
    role?: UserRole
    provider?: string
    providerAccountId?: string
    createdAt: Date;
    updatedAt: Date;
}