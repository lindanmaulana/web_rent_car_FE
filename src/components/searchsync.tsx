'use client'

import { useSearchStore } from "@/stores/searchStore"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export const SearchSync = () => {
    const params = useSearchParams()
    const keywordURL = params.get("keyword") || ""

    const keyword = useSearchStore((s) => (s.keyword))
    const setKeyword = useSearchStore((s) => (s.setKeyword))

    useEffect(() => {
        if(keyword !== keywordURL) {
            setKeyword(keywordURL)
        }

    }, [keyword])

    return null
}