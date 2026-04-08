import mongoose, { Schema, models } from "mongoose";

const CollectionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Collection =
  models.Collection || mongoose.model("Collection", CollectionSchema);

export default Collection;
