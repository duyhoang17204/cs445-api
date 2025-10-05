import { Response } from "express";

import { requestError, requestSuccess } from "../../utils/responses";
import BuyProductService from "./buyProduct.service";

const create = (req: any, res: Response) => {
  BuyProductService.create(req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
};
const getAll = (req: any, res: Response) => {
  BuyProductService.getAll().then(requestSuccess(res)).catch(requestError(res));
};
const BuyProductController = {
  create,
  getAll,
};

export default BuyProductController;
