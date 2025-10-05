import BuyProductModel from "./buyProducts.model";

const create = (body: any) =>
  new Promise(async (rs, rj) => {
    try {
      const product = await BuyProductModel.create({ ...body });
      rs(product);
    } catch (error) {
      rj(error);
    }
  });

const getAll = () =>
  new Promise(async (rs, rj) => {
    try {
      const products = await BuyProductModel.find();
      rs(products);
    } catch (error) {
      rj(error);
    }
  });

const BuyProductService = {
  create,
  getAll,
};
export default BuyProductService;
