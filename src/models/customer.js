// name = string, requerido, unique
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true, // limpia los espacios en strings
    },
  },
  { timestamps: true } // createdAt / updeateAt
);

export default mongoose.model("Customer", customerSchema);
