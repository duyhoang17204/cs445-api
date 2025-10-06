import { Response } from "express";

import { requestError, requestSuccess } from "../../utils/responses";
import ProductService from "./products.service";

const create = (req: any, res: Response) => {
  ProductService.create(req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
};
const getAll = (req: any, res: Response) => {
  ProductService.getAll(req.query)
    .then(requestSuccess(res))
    .catch(requestError(res));
};
const ProductController = {
  create,
  getAll,
};

export default ProductController;
