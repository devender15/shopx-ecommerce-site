import { connectToDB } from "@utils/database";
import Cart from "@models/cart";

export const POST = async (request) => {
  const { userId, cart } = await request.json();

  try {
    await connectToDB();

    // check if user already has a cart, if yes then update it else create a new one
    const existingCart = await Cart.findOne({ creator: userId });
    if (existingCart) {
      existingCart.cart = cart;
      await existingCart.save();
      return new Response(JSON.stringify(existingCart), { status: 200 });
    }

    const newCart = new Cart({ creator: userId, cart: cart });
    await newCart.save();
    return new Response(JSON.stringify(newCart), { status: 201 });
  } catch (error) {
    return new Response("Failed to update the cart!", { status: 500 });
  }
};
