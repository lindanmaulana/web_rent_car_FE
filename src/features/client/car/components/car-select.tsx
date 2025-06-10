"use client"

import clsx from "clsx"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const CarSelect = () => {
    const urlParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const handleFilter = (key: KEYFILTER, value: string) => {
        const params = new URLSearchParams(window.location.search)

        if(value === "" || value === "reset") {
            params.delete(key)
        } else {
            params.set(key, value)
        }

        router.replace(`${pathname}?${params.toString()}`)
    }
    
    return (
        <>
            {CarSelectList?.map(select => (
                <li key={select.id} onClick={() => handleFilter(select.title, select.param)} className={clsx("min-w-20 rounded-full px-4 py-1 text-sm font-semibold ", urlParams.get(select.param) || select.param === "" ? "bg-primary-blue text-white" : "bg-white-blue text-primary" )}>{select.title}</li>
            ))}
        </>
    )
}

type KEYFILTER = "all vihicles" | "brand" | "category" | "seats"

interface CarSelect {
    id: number,
    title: KEYFILTER
    param: string
}

const CarSelectList: CarSelect[] = [
    {
        id: 1,
        title: "All Vihicles",
        param: ""
    },
    {
        id: 2,
        title: "Brand",
        param: "brand"
    },
    {
        id: 3,
        title: "Category",
        param: "category"
    },
    {
        id: 4,
        title: "Seats",
        param: "seats"
    },
]

