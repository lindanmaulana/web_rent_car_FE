"use client"

import Link from "next/link"

export const Footer = () => {
    
    return (
        <footer className="pt-11 pb-6">
            <div className="container max-w-6xl mx-auto divide-y-2">
                <div className="grid grid-cols-2  py-9">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-[32px] text-primary-blue font-bold">Morent</h2>
                        <p className="max-w-[292px]">Our vision is to provide convenience and help increase your sales business.</p>
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">About</h2>
                            <ul className="space-y-2 text-base">
                                {footerAboutList?.map(about => (
                                    <li key={about.id}>
                                        <Link href={about.url} className="text-black/60 hover:text-black/40">{about.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Community</h2>
                            <ul className="space-y-2 text-base">
                                {footerCommunityList?.map(about => (
                                    <li key={about.id}>
                                        <Link href={about.url} className="text-black/60 hover:text-black/40">{about.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Socials</h2>
                            <ul className="space-y-2 text-base">
                                {footerSocialList?.map(about => (
                                    <li key={about.id}>
                                        <Link href={about.url} className="text-black/60 hover:text-black/40">{about.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between py-9">
                    <h2>©2022 MORENT. All rights reserved</h2>
                    <ul>
                        <li>
                            <Link href="/">Privacy & Policy</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

interface footerList {
    id: number
    title: string
    url: string
}

const footerAboutList: footerList[] = [
    {
        id: 1,
        title: "How it works",
        url: "/"
    },
    {
        id: 2,
        title: "Featured",
        url: "/"
    },
    {
        id: 3,
        title: "Partnership",
        url: "/"
    },
    {
        id: 4,
        title: "Bussiness Relation",
        url: "/"
    },
]

const footerCommunityList: footerList[] = [
    {
        id: 1,
        title: "Events",
        url: "/"
    },
    {
        id: 2,
        title: "Blog",
        url: "/"
    },
    {
        id: 3,
        title: "Podcast",
        url: "/"
    },
    {
        id: 4,
        title: "Invite a friend",
        url: "/"
    },
]

const footerSocialList: footerList[] = [
    {
        id: 1,
        title: "Discord",
        url: "/"
    },
    {
        id: 2,
        title: "Instagram",
        url: "/"
    },
    {
        id: 3,
        title: "Twitter",
        url: "/"
    },
    {
        id: 4,
        title: "Facebook",
        url: "/"
    },
]