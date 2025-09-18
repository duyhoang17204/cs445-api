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

export default {
  create,
};
