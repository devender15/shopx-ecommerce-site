import Wishlist from "@models/wishlist"
import { connectToDB } from "@utils/database"

export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        const wishlists = await Wishlist.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(wishlists), { status: 200 })
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch wishlists created by user", { status: 500 })
    }
}