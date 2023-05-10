
import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
})


const cartModel = model("carts", cartSchema)

export default cartModel