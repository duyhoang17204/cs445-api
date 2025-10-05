import UserModel from "./users.model";
import bcrypt from "bcryptjs";

const create = (body: any): any =>
  new Promise(async (rs, rj) => {
    try {
      const user = await UserModel.create({
        ...body,
        password: bcrypt.hashSync(body.password),
      });
      rs(user);
    } catch (error) {
      rj(error);
    }
  });

const getAll = () =>
  new Promise(async (rs, rj) => {
    try {
      const users = await UserModel.find();
      rs(users);
    } catch (error) {
      rj(error);
    }
  });

const deleted = (id: any) =>
  new Promise(async (rs, rj) => {
    try {
      await UserModel.deleteOne({
        _id: id,
      });
      rs("Deleted Success");
    } catch (error) {
      rj(error);
    }
  });

export default {
  create,
  getAll,
  deleted,
};
