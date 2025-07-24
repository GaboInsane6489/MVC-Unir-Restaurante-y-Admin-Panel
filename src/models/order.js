import mongoose from "mongoose";

const orderSchema = new  mongoose.Schema(
    {
        tableNumber: {type: Number, required: true},
        description: {type: String, required: true},
        status: {
            type: String,
            enum: ["todo", "donde", "delivered"],
            default: "todo", 
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },
    },
    { timestamps: true}
);

export default mongoose.model("Order", orderSchema)