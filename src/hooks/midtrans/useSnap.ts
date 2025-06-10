"use client"

import { MIDTRANS_CLIENT_KEY, MIDTRANS_URL } from "@/publicConfig"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Snap {
    pay: (token: string, options?: unknown) => void
    embed: (token: string, options?: unknown) => void
}

export const useSnap = () => {
    const [snap, setSnap] = useState<Snap | null>(null)
    const navigate = useRouter()

    
    useEffect(() => {
        const myMidtransClientKey = MIDTRANS_CLIENT_KEY
        const script: HTMLScriptElement = document.createElement('script')

        script.src = MIDTRANS_URL
        script.setAttribute('data-client-key', myMidtransClientKey)

        script.onload = () => {
            if(window.snap) setSnap(window.snap)
        }

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }

    }, [])

    const snapEmbed = (snap_token: string, embedId: string, action: () => void) => {
        if(snap) {
            snap.embed(snap_token, {
                embedId,
                onSuccess: () => {
                    navigate.push("/")
                },

                onError: () => {
                    console.log("error fail")
                }
            })
        }
    }


    return {snapEmbed}
}