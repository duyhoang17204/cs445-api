import ProductModel from "./products.model";

const create = (body: any) =>
  new Promise(async (rs, rj) => {
    try {
      const product = await ProductModel.create({ ...body });
      rs(product);
    } catch (error) {
      rj(error);
    }
  });

const ProductService = {
  create,
};
export default ProductService;
