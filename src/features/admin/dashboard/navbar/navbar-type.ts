import { IoIosCar } from "react-icons/io";
import { IconType } from "react-icons/lib"
import { RiHome6Fill } from "react-icons/ri";
import { BsBarChartFill, BsCalendar2WeekFill } from "react-icons/bs";
import { BiSolidWallet } from "react-icons/bi";
import { TbMessageFilled } from "react-icons/tb";
import { FaUserClock } from "react-icons/fa";

export interface NavbarList {
    id: number
    icon: IconType
    title: string
    url: string
}

export const navbarListMainMenu: NavbarList[] = [
    {
        id: 1,
        icon: RiHome6Fill,
        title: "Dashboard",
        url: "/dashboard"
    },
    {
        id: 2,
        icon: IoIosCar,
        title: "Car",
        url: "/dashboard/car-rental"
    },
    {
        id: 3,
        icon: FaUserClock,
        title: "Rental",
        url: "/dashboard/rental"
    },
    {
        id: 4,
        icon: BsBarChartFill ,
        title: "Insight",
        url: "/dashboard/insight"
    },
    {
        id: 5,
        icon: BiSolidWallet,
        title: "Reimburse",
        url: "/dashboard/reimburse"
    },
    {
        id: 6,
        icon: TbMessageFilled,
        title: "Inbox",
        url: "/dashboard/inbox"
    },
    {
        id: 7,
        icon: BsCalendar2WeekFill,
        title: "Calender",
        url: "/dashboard/calender"
    },
]