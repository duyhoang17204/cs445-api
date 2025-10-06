import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import { TABLE_REVIEW } from "../../config/table";

const ReviewSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      ref: "Product",
      // required: true,
    },
    user: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
    images: [String], // thêm mảng hình nếu có
    status: {
      type: String,
      enum: ["enable", "blocked"],
      default: "enable",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

ReviewSchema.plugin(paginate);

const ReviewModel = mongoose.model(TABLE_REVIEW, ReviewSchema);

export default ReviewModel;
