import { BsBarChartFill, BsCalendar2WeekFill } from "react-icons/bs";
import { FaAward, FaTags, FaUserClock } from "react-icons/fa";
import { IoIosCar } from "react-icons/io";
import { IconType } from "react-icons/lib";
import { MdInventory } from "react-icons/md";
import { RiHome6Fill } from "react-icons/ri";
export interface NavbarList {
  id: number;
  icon: IconType;
  title: string;
  url: string;
  isSubmenu?: boolean;
  subMenu?: {
    id: number;
    icon: IconType
    subTitle: string;
    subUrl: string;
  }[];
}

export const navbarListMainMenu: NavbarList[] = [
  {
    id: 1,
    icon: RiHome6Fill,
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 2,
    icon: MdInventory,
    title: "Inventory",
    url: "/dashboard/inventory",
    isSubmenu: true,
    subMenu: [
        {
            id: 1,
            icon: IoIosCar,
            subTitle: "Car",
            subUrl: "/dashboard/inventory/car?page=1&limit=5"
        },
        {
            id: 2,
            icon: FaTags,
            subTitle: "Category",
            subUrl: "/dashboard/inventory/car-category"
        },
        {
            id: 3,
            icon: FaAward,
            subTitle: "Brand",
            subUrl: "/dashboard/inventory/car-brand"
        },
    ]
  },
  {
    id: 3,
    icon: FaUserClock,
    title: "Rental",
    url: "/dashboard/rental",
  },
  {
    id: 4,
    icon: BsBarChartFill,
    title: "Insight",
    url: "/dashboard/insight",
  },
  {
    id: 5,
    icon: BsCalendar2WeekFill,
    title: "Calender",
    url: "/dashboard/calender",
  },
];
