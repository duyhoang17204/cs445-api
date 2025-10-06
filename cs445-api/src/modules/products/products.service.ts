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
const update = (id: string, body: any) =>
  new Promise(async (rs, rj) => {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        { ...body },
        { new: true }
      );

      if (!updatedProduct) {
        return rj(new Error("Product not found"));
      }

      rs(updatedProduct);
    } catch (error) {
      rj(error);
    }
  });

const ProductService = {
  create,
  getAll,
  update,
};
export default ProductService;
