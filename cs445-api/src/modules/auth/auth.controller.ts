import { Response } from "express";
import AuthService from "./auth.service";
import { requestError, requestSuccess } from "../../utils/responses";

const register = (req: any, res: Response) => {
  AuthService.register(req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
};

const loginByUser = (req: any, res: Response) => {
  AuthService.loginByUser(req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
};
const verifyLogin = (req: any, res: Response) => {
  AuthService.verifyLogin(req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
};

export default { register, loginByUser, verifyLogin };
