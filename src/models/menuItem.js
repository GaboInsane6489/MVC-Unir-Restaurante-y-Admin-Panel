import mongoose, {Schema, Model, mongo} from 'mongoose'

const menuItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    }
);

//Crear modelo de categorias que referencie al schema principal
export default mongoose.model("MenuItem", menuItemSchema)