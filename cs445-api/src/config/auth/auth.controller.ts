import { Response } from "express";
import RegisterService from "./auth.service";
import { requestError, requestSuccess } from "../utils/responses";

const register = (req: any, res: Response) => {
  RegisterService.register(req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
};

export default { register };
