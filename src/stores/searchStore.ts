"use client"

import {create} from "zustand"

type SearchStore = {
    keyword: string
    setKeyword: (keyword: string) => void
}

export const useSearchStore = create<SearchStore>((set) => ({
    keyword: '',
    setKeyword: (val) => set({keyword: val})
}))