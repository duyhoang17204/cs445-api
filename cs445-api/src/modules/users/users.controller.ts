import { requestError, requestSuccess } from "../../utils/responses";
import { Request, Response } from "express";
import UserService from "./users.service";

const create = (req: Request, res: Response) => {
  UserService.create(req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
};

export default {
  create,
};
