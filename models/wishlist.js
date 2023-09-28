import { Schema, models, model } from "mongoose";

const WishlistSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    wishlist: {
        type: Array,
        required: false,
    },
});

const Wishlist = models.Wishlist || model("Wishlist", WishlistSchema);

export default Wishlist;