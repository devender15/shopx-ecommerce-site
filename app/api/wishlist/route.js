import { connectToDB } from "@utils/database";
import Wishlist from "@models/wishlist";

export const POST = async (request) => {
  const { userId, wishlist } = await request.json();

  try {
    await connectToDB();

    // check if user already has a wishlist, if yes then update it else create a new one
    const existingWishlist = await Wishlist.findOne({ creator: userId });
    if (existingWishlist) {
      existingWishlist.wishlist = wishlist;
      await existingWishlist.save();
      return new Response(JSON.stringify(existingWishlist), { status: 200 });
    }

    const newWishlist = new Wishlist({ creator: userId, wishlist });
    await newWishlist.save();
    return new Response(JSON.stringify(newWishlist), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new wishlist", { status: 500 });
  }
};
