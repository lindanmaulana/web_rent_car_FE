const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const AUTH_SECRET = process.env.AUTH_SECRET

const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY

export const oauthGithubConfig = {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET
}

export const oauthGoogleConfig = {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
}

export const authSecret = {
    AUTH_SECRET
}

export const midtransConfig = {
    MIDTRANS_CLIENT_KEY,
    MIDTRANS_SERVER_KEY,
}