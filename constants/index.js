import { AiOutlineClockCircle, AiOutlineDollarCircle } from "react-icons/ai";
import { FaTruckMoving } from "react-icons/fa";
import { TbDiscount2 } from "react-icons/tb";
import { CATEGORIES } from "./categories";

export const NAV_ROUTES = [
    {   
        id: 1,
        name: 'Home',
        path: '/',
        isDropdown: false,
    },
    {
        id: 2,
        name: 'Men',
        path: '/category/men',
        isDropdown: true,
        categories: CATEGORIES["Men"],
    },
    {
        id: 3,
        name: 'Women',
        path: '/category/women',
        isDropdown: true,
        categories: CATEGORIES["Men"],
    },
    {
        id: 4,
        name: 'Kids',
        path: '/category/kids',
        isDropdown: true,
        categories: CATEGORIES["Men"],
    },
    {
        id: 5,
        name: 'Contact Us',
        path: '/',
        isDropdown: false,
    },
]

export const SERVICES = [
    {
        id: 1,
        name: 'Free Shipping',
        description: 'Free shipping on all order',
        icon: <FaTruckMoving fontSize={55} />,
    },
    {
        id: 2,
        name: 'Support 24/7',
        description: 'Free shipping on all order',
        icon: <AiOutlineClockCircle fontSize={55}  />,
    },
    {
        id: 3,
        name: 'Money Return',
        description: 'Free shipping on all order',
        icon: <AiOutlineDollarCircle fontSize={55}  />,
    },
    {
        id: 4,
        name: 'Order Discount',
        description: 'Free shipping on all order',
        icon: <TbDiscount2 fontSize={55}  />,
    },

]

export const PRODUCT_SIZES = [
    {
        id: 1,
        name: 'S',
    },
    {
        id: 2,
        name: 'M',
    },
    {
        id: 3,
        name: 'L',
    },
    {
        id: 4,
        name: 'XL',
    },
]

export const PRODUCT_COLORS = [
    {
        id: 1,
        name: 'bg-red-500',
    },
    {
        id: 2,
        name: 'bg-blue-500',
    },
    {
        id: 3,
        name: 'bg-green-500',
    },
]