import { jwtToken, pareJwtToken } from "../../utils/jwt";
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

const loginByUser = (body: any) =>
  new Promise(async (rs, rj) => {
    try {
      const { email, password } = body;

      const user: any = await UserModel.findOne({
        email: email.toLowerCase(),
        status: "enable",
      });

      if (user && user.checkPassword(password)) {
        const token = jwtToken({
          id: user._id,
          email: user.email,
        });
        const userObj = user.toJSON();
        delete userObj.password;
        rs({
          user: userObj,
          token: token,
        });
      } else {
        rj({ message: "Invalid email or password!" });
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      rj(error);
    }
  });

const verifyLogin = (body: any) =>
  new Promise(async (rs, rj) => {
    try {
      const _user: any = pareJwtToken(body.token);
      if (!_user) {
        rj("Token expire!");
      }
      const user = await UserModel.findOne({
        email: _user.email.toLowerCase(),
      });
      if (!user) return rj("Code expire!");
      const _userJson = user.toJSON();

      const token = jwtToken(
        {
          id: user._id,
          email: user.email,
        },
        {
          expiresIn: 864000,
        }
      );
      user.status = "enable";
      await user.save();
      return rs({
        user: {
          ..._userJson,
        },
        token: token,
      });
    } catch (error) {
      rj(error);
    }
  });

export default {
  register,
  loginByUser,
  verifyLogin,
};
