import { jwtToken, pareJwtToken } from "../../utils/jwt";
import UserModel from "../users/users.model";
import UsersService from "../users/users.service";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

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

const forgotPassword = async (body: any) => {
  const { email } = body;
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("Không tìm thấy người dùng!");

  const resetToken = jwtToken({ email }, { expiresIn: 600 }); // 10 phút

  const resetLink = `https://your-frontend-domain.com/reset-password?token=${resetToken}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Support Team" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Đặt lại mật khẩu của bạn",
    html: `
      <h3>Xin chào!</h3>
      <p>Bạn vừa yêu cầu đặt lại mật khẩu.</p>
      <p>Nhấn vào liên kết bên dưới để đổi mật khẩu (hết hạn sau 10 phút):</p>
      <a href="${resetLink}" target="_blank">${resetLink}</a>
      <br/><br/>
      <p>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
    `,
  });

  return "Email đặt lại mật khẩu đã được gửi!";
};

const resetPasswordSimple = async (body: any) => {
  const { token, newPassword } = body;
  if (!token || !newPassword) throw new Error("Thiếu token hoặc mật khẩu mới!");

  const decoded: any = pareJwtToken(token);
  if (!decoded?.email) throw new Error("Token không hợp lệ hoặc đã hết hạn!");

  const user = await UserModel.findOne({ email: decoded.email });
  if (!user) throw new Error("Không tìm thấy người dùng!");

  user.password = bcrypt.hashSync(newPassword, 10);
  await user.save();

  return "Đổi mật khẩu thành công!";
};

export default {
  register,
  loginByUser,
  verifyLogin,
  resetPasswordSimple,
  forgotPassword,
};
