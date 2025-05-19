"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Fragment, useEffect, useState } from "react"
import { IoIosArrowUp } from "react-icons/io"
import { CardNavbar } from "./card-navbar"
import { navbarListMainMenu } from "./navbar-type"

export const NavbarMainMenu = () => {
    const pathname = usePathname()
    const [isUnit, setIsUnit] = useState<boolean>(false)
    const urlParams = useSearchParams()

    useEffect(() => {
        if(pathname.startsWith("/dashboard/inventory")) {
            setIsUnit(true)
        }
    }, [pathname])

    return (
        <CardNavbar headerTitle="MAIN MENU">
            {navbarListMainMenu?.map(menu => {
                const url = `${menu.url}?${urlParams.toString()}`
                
                return (
                    <Fragment key={menu.id}>
                        {!menu.isSubmenu ? (
                            <li key={menu.id} className={`${pathname === menu.url ? "bg-primary-blue rounded-md scale-110 px-2 py-1 text-white" : "text-[#90A3BF]"} flex items-center gap-x-2`}>
                                <menu.icon className="text-xl" />
                                <Link href={url} className="text-md w-full">{menu.title}</Link>
                            </li>
                        ): (
                            <li key={menu.id} className={"text-[#90A3BF] cursor-pointer flex flex-col gap-3"}>
                                <div onClick={() => setIsUnit(!isUnit)} className="w-full flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <menu.icon className="text-xl" />
                                        <p>{menu.title}</p>
                                    </div>
                                    <IoIosArrowUp className={`${isUnit ? "rotate-180" : ""}`} />
                                </div>
                                {isUnit && (
                                    <ul className="pl-6 space-y-3">
                                        {menu.subMenu && menu.subMenu.map(list => {
                                            const url = `${list.subUrl}?${urlParams.toString()}`

                                            return (
                                            <li key={list.id} className={`${pathname === list.subUrl ? "bg-primary-blue rounded-md scale-110 px-2 py-1 text-white" : "text-[#90A3BF]"} flex items-center gap-x-2`}>
                                                <list.icon className="text-xl" />
                                                <Link href={url} className="text-md w-full">{list.subTitle}</Link>
                                            </li>
                                        )})}
                                    </ul>
                                )}
                            </li>
                        )}
                    </Fragment>
                )
               })}
        </CardNavbar>
    )
}