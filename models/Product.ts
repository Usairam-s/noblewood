import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    actualPrice: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    collection: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    tag: {
      type: String,
      enum: ["featured", "trending", "bestseller"],
    },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
  }
);

const Product = models.Product || mongoose.model("Product", ProductSchema);

export default Product;
