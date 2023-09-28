import { connectToDB } from "@utils/database";
import Cart from "@models/cart";


export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const cart = await Cart.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(cart), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch cart created by user", { status: 500 })
    }
}