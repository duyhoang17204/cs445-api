import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import { IBuyProduct } from "../../types/entityTypes";
import { TABLE_BUY_PRODUCT, TABLE_PRODUCT } from "../../config/table";

export interface IBuyProductDocModel extends IBuyProduct, mongoose.Document {}

interface IBuyProductModel extends mongoose.Model<IBuyProductDocModel> {
  paginate: any;
}

const _Schema = new mongoose.Schema<IBuyProductDocModel>(
  {
    name_product: {
      type: String,
    },

    user_id: {
      type: String,
    },
    id_product: {
      type: String,
    },
    price: { type: String },

    createdById: {
      type: mongoose.Schema.Types.ObjectId,
    },
    updatedById: {
      type: mongoose.Schema.Types.ObjectId,
    },
    deletedAt: { type: Date, required: false },
    deletedById: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

_Schema.plugin(paginate);

const BuyProductModel = mongoose.model<IBuyProductDocModel, IBuyProductModel>(
  TABLE_BUY_PRODUCT,
  _Schema
);

export default BuyProductModel;
