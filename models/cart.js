import { Schema, models, model } from "mongoose";

const CartSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    cart: {
        type: Array,
        required: false,
    },
});

const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;