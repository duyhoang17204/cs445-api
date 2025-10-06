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

const getAll = (query: any) =>
  new Promise(async (rs, rj) => {
    try {
      const { category_id } = query;
      const filter = {
        ...(category_id ? { category_id } : {}),
      };
      const products = await ProductModel.find(filter);
      rs(products);
    } catch (error) {
      rj(error);
    }
  });

const ProductService = {
  create,
  getAll,
};
export default ProductService;
