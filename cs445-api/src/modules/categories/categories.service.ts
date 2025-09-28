import CategoryModel from "./categories.model";

const create = (body: any) =>
  new Promise(async (rs, rj) => {
    try {
      const product = await CategoryModel.create({ ...body });
      rs(product);
    } catch (error) {
      rj(error);
    }
  });

const getAll = () =>
  new Promise(async (rs, rj) => {
    try {
      const category = await CategoryModel.find();
      rs(category);
    } catch (error) {
      rj(error);
    }
  });

const CategoryService = {
  create,
  getAll,
};
export default CategoryService;
