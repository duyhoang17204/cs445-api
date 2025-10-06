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
const deleted = (id: any) =>
  new Promise(async (rs, rj) => {
    try {
      await CategoryModel.deleteOne({
        _id: id,
      });
      rs("Deleted Success");
    } catch (error) {
      rj(error);
    }
  });

const update = (id: any, body: any) =>
  new Promise(async (rs, rj) => {
    try {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        id,
        { ...body },
        { new: true }
      );
      if (!updatedCategory) throw new Error("Category not found");
      rs(updatedCategory);
    } catch (error) {
      rj(error);
    }
  });

const CategoryService = {
  create,
  getAll,
  deleted,
  update,
};
export default CategoryService;
