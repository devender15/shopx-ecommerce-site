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
        path: '/shop?cat=men',
        isDropdown: true,
        categories: CATEGORIES["Men"],
    },
    {
        id: 3,
        name: 'Women',
        path: '/shop?cat=women',
        isDropdown: true,
        categories: CATEGORIES["Women"],
    },
    {
        id: 4,
        name: 'Kids',
        path: '/shop?cat=kids',
        isDropdown: true,
        categories: CATEGORIES["Kids"],
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

export const SORT_BY = [
    {
        id: 1,
        name: 'Price: Low to High',
        value: 'low-high',
    },
    {
        id: 2,
        name: 'Price: High to Low',
        value: 'high-low',
    },
    {
        id: 3,
        name: 'Newest',
        value: 'new',
    },
    {
        id: 4,
        name: 'Oldest',
        value: 'old',
    },
]

export const CATEGORY_SIDEBAR = {
    "CATEGORIES": [
        {
            id: 1,
            name: "All Categories",
            value: "all-categories",
        },
        {
            id: 2,
            name: "Men",
            value: "men",
        },
        {
            id: 3,
            name: "Women",
            value: "women",
        },
        {
            id: 4,
            name: "Kids",
            value: "kids",
        },
        {
            id: 5,
            name: "Decoration",
            value: "decoration",
        },
        {
            id: 6,
            name: "Furniture",
            value: "furniture",
        },
        {
            id: 7,
            name: "Accessories",
            value: "accessories",
        },
    ],

    "SIZE": [
        {
            id: 1,
            name: "All Sizes",
            value: "all-sizes",
        },
        {
            id: 2,
            name: "S",
            value: "s",
        },
        {
            id: 3,
            name: "M",
            value: "m",
        },
        {
            id: 4,
            name: "L",
            value: "l",
        }
    ],

    "PRICE": [
        {
            id: 1,
            name: "All Prices",
            value: "all-prices",
        },
        {
            id: 2,
            name: "Under ₹1000",
            value: "<1000",
        },
        {
            id: 3,
            name: "₹1000 - ₹3000",
            value: "1000-3000",
        },
        {
            id: 4,
            name: "Above ₹3000",
            value: ">3000",
        },
    ],
}