import mongoose, { Schema, models } from "mongoose";

const OrderSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    alternativePhone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    nearbyPlace: {
      type: String,
      trim: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: String,
        actualPrice: Number,
        quantity: Number,
        image: String,
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
      default: 280,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = models.Order || mongoose.model("Order", OrderSchema);

export default Order;
