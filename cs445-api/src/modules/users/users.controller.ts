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

const update = (req: Request, res: Response) => {
  const { id } = req.params;
  UserService.update(id, req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
};

const UserController = {
  create,
  getAll,
  deleted,
  update,
};

export default UserController;
