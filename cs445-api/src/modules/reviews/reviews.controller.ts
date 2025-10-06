import { Request, Response } from "express";
import { requestError, requestSuccess } from "../../utils/responses";
import ReviewService from "./reviews.service";

const create = (req: Request, res: Response) => {
  ReviewService.create(req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
};

const getByProduct = (req: Request, res: Response) => {
  const productId = req.params.product_id;
  if (!productId) return requestError(res)(new Error("Product ID is required"));

  ReviewService.getByProduct(productId)
    .then(requestSuccess(res))
    .catch(requestError(res));
};

const update = (req: Request, res: Response) => {
  const reviewId = req.params.id;
  if (!reviewId) return requestError(res)(new Error("Review ID is required"));

  ReviewService.update(reviewId, req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
};

const deleted = (req: Request, res: Response) => {
  const reviewId = req.params.id;
  if (!reviewId) return requestError(res)(new Error("Review ID is required"));

  ReviewService.deleteReview(reviewId)
    .then(requestSuccess(res))
    .catch(requestError(res));
};

export default { create, getByProduct, update, deleted };
