import { Response } from "express";

import { requestError, requestSuccess } from "../../utils/responses";
import CategoryService from "./categories.service";

const create = (req: any, res: Response) => {
  CategoryService.create(req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
};
const getAll = (req: any, res: Response) => {
  CategoryService.getAll().then(requestSuccess(res)).catch(requestError(res));
};
const CategoryController = {
  create,
  getAll,
};

export default CategoryController;
