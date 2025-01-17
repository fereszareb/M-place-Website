import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your Product name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    SKU: {
      type: String,
      required: [true, "Please provide your Product SKU"],
      minlength: 3,
      maxlength: 20,
      trim: true,
      unique: true,
    },
    marque: {
      type: String,
      required: [true, "Please provide your Product brand"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide your Product description"],
      minlength: 10,
    },
    categoryId: {
      type: String,
      required: [true, "Please provide your category id"],
      trim: true,
      default: "/",
    },
    Filter_list: [{ type: mongoose.Types.ObjectId, ref: "Filter" }],
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
