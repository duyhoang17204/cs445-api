import mongoose from "mongoose";
import { IProductDoc } from "../types/entityTypes";
import paginate from "mongoose-paginate-v2";
import { TABLE_PRODUCT } from "../config/table";
mongoose.Promise = require("bluebird");

export interface IProductDocModel extends IProductDoc, mongoose.Document {}

interface IProductModel extends mongoose.Model<IProductDocModel> {
  paginate: any;
}

const _Schema = new mongoose.Schema<IProductDocModel>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    },

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

const CategoryFieldModel = mongoose.model<IProductDocModel, IProductModel>(
  TABLE_PRODUCT,
  _Schema
);

export default CategoryFieldModel;
