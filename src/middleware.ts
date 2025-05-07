import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import authConfig from "./auth.config";
import { APIAUTHPREFIX, DEFAULT_ADMIN_REDIRECT, DEFAULT_LOGIN_REDIRECT, ROUTESAUTH, ROUTESPREFIXADMIN, ROUTESPUBLIC } from "./routes";

const {auth} = NextAuth(authConfig)

export default auth(async function middleware(req: NextRequest) {
    const {nextUrl} = req
    const token = await getToken({req, secret: process.env.AUTH_SECRET})
    const isLoggedIn = !!token

    const isApiRoute = nextUrl.pathname.startsWith(APIAUTHPREFIX)
    const isPublicRoute = ROUTESPUBLIC.includes(nextUrl.pathname)
    const isAdminRoute = nextUrl.pathname.startsWith(ROUTESPREFIXADMIN)
    const isAuthRoute = ROUTESAUTH.includes(nextUrl.pathname)


    if(isApiRoute) {
        return;
    }

    if(isAuthRoute) {
        if(isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }

        return NextResponse.next();
    }

    console.log({isLoggedIn})
    console.log({token})

    if(isLoggedIn) {
        if(token) {
            if(Date.now() > token.exp! * 1000) {
                const response = NextResponse.redirect(new URL("/auth/login", nextUrl))

                response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
                response.cookies.set("__Secure-next-auth.session-token", "", { maxAge: 0 });
                response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });

                return response
            }

            if(isPublicRoute && token.role === "ADMIN") {
                return NextResponse.redirect(new URL(DEFAULT_ADMIN_REDIRECT, nextUrl))
            }

            if(isAdminRoute && token.role === "USER") {
                return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
            }

            if(!token.role) {
                const response = NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
                
                response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
                response.cookies.set("__Secure-next-auth.session-token", "", { maxAge: 0 });
                response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });

                return response
            }
        } else {
            return NextResponse.redirect(new URL("/auth/login", nextUrl))
        }
    }

    if(!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/auth/login", nextUrl))
    }

    return NextResponse.next()
})

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)'
    ]
}

