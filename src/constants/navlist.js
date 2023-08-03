import React from "react";
import {
    MdDashboard
} from "react-icons/md";
import {
    HiOutlineScissors,
    HiOutlineChatAlt
} from "react-icons/hi";
import {
    MdOutlineSendTimeExtension,
    MdOutlineSettings
} from "react-icons/md";
import {
    ImLocation2
} from "react-icons/im"
import {
    PiUsersThreeFill
} from "react-icons/pi"
import {
    GiLightningFrequency
} from "react-icons/gi"


export const navItems = [
    {
        id: 1,
        name: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
        permission: "dashboard"
    },
    {
        id: 2,
        name: "Users",
        path: "/dashboard/users",
        icon: <PiUsersThreeFill />,
        permission: "users"
    },
    {
        id: 3,
        name: "Requests",
        path: "/dashboard/requests",
        icon: <GiLightningFrequency />,
        permission: "requests"
    },
    {
        id: 4,
        name: "Regions",
        path: "/dashboard/regions",
        icon: <ImLocation2 />,
        permission: "regions"
    },
    {
        id: 5,
        name: "Distribute",
        path: "/dashboard/distribute",
        icon: <MdOutlineSendTimeExtension />,
        permission: "distribute"
    },
    {
        id: 6,
        name: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
        permission: "settings"
    }
]