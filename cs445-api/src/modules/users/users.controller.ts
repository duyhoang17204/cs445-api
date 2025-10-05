import { requestError, requestSuccess } from "../../utils/responses";
import { Request, Response } from "express";
import UserService from "./users.service";

const create = (req: Request, res: Response) => {
  UserService.create(req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
};
const getAll = (req: Request, res: Response) => {
  UserService.getAll().then(requestSuccess(res)).catch(requestError(res));
};
const deleted = (req: Request, res: Response) => {
  UserService.deleted(req.params.id)
    .then(requestSuccess(res))
    .catch(requestError(res));
};

const UserController = {
  create,
  getAll,
  deleted,
};

export default UserController;
