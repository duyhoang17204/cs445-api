import UserModel from "../users/users.model";
import UsersService from "../users/users.service";

const register = async (body: any) => {
  try {
    const { email } = body;
    const userExisted = await UserModel.findOne({ email: email.toLowerCase() });

    if (userExisted) {
      throw new Error("User already exists");
    }

    const newUser = await UsersService.create({
      ...body,
      status: "enable",
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};

export default {
  register,
};
