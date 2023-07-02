import { AiOutlineClockCircle, AiOutlineDollarCircle } from "react-icons/ai";
import { FaTruckMoving } from "react-icons/fa";
import { TbDiscount2 } from "react-icons/tb";


export const NAV_ROUTES = [
    {   
        id: 1,
        name: 'Home',
        path: '/',
    },
    {
        id: 2,
        name: 'Shop',
        path: '/',
    },
    {
        id: 3,
        name: 'Collection',
        path: '/',
    },
    {
        id: 4,
        name: 'Pages',
        path: '/',
    },
    {
        id: 5,
        name: 'Contact Us',
        path: '/',
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