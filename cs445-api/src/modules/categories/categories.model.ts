import mongoose from "mongoose";
import { ICategories } from "../../types/entityTypes";
import paginate from "mongoose-paginate-v2";
import { TABLE_CATEGORY } from "../../config/table";

export interface ICategoryDocModel extends ICategories, mongoose.Document {}

interface IProductModel extends mongoose.Model<ICategoryDocModel> {
  paginate: any;
}

const _Schema = new mongoose.Schema<ICategoryDocModel>(
  {
    name: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
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

const CategoryModel = mongoose.model<ICategoryDocModel, IProductModel>(
  TABLE_CATEGORY,
  _Schema
);

export default CategoryModel;
