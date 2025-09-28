import mongoose from "mongoose";
import { IUserDoc } from "../../types/entityTypes";
import { ROLE } from "../../types/enumTypes";
import bcrypt from "bcryptjs";
import { TABLE_ROLE, TABLE_USER } from "../../config/table";
import { paginate } from "mongoose-paginate-v2";
import { toJSON } from "../../plugins";

const Schema = mongoose.Schema;

export interface IUserModelDoc extends IUserDoc, mongoose.Document {}

interface IUserModel extends mongoose.Model<IUserModelDoc> {
  paginate: any;
  toJSON: any;
}

const UserSchema = new Schema<IUserModelDoc>(
  {
    password: { type: String, require: true },
    role: { type: String, enum: ROLE, default: ROLE.USER },
    email: { type: String, unique: true, require: true },
    phone: { type: String },
    full_name: { type: String, required: false, default: "" },
    status: {
      type: String,
      enum: ["enable", "blocked", "pending"],
      default: "enable",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.virtual("roles", {
  ref: TABLE_ROLE,
  localField: "role",
  foreignField: "role",
  justOne: false,
});
UserSchema.plugin(toJSON);

UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

const UserModel = mongoose.model<IUserModelDoc, IUserModel>(
  TABLE_USER,
  UserSchema
);

export default UserModel;
