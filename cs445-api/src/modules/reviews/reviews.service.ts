import ReviewModel from "./reviews.model";

const create = (body: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const review = await ReviewModel.create(body);
      resolve(review);
    } catch (error) {
      reject(error);
    }
  });

const getByProduct = (product_id: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const reviews = await ReviewModel.find({
        product_id,
        status: "enable",
      }).sort({ createdAt: -1 });

      const avgRating =
        reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0) /
        (reviews.filter((r) => r.rating).length || 1);

      resolve({
        averageRating: Number(avgRating.toFixed(1)),
        count: reviews.length,
        reviews,
      });
    } catch (error) {
      reject(error);
    }
  });

// Cập nhật review
const update = (id: string, body: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const updatedReview = await ReviewModel.findByIdAndUpdate(id, body, {
        new: true,
      });
      if (!updatedReview) return reject(new Error("Review not found"));
      resolve(updatedReview);
    } catch (error) {
      reject(error);
    }
  });

// Xóa review
const deleteReview = (id: string) =>
  new Promise(async (resolve, reject) => {
    try {
      await ReviewModel.findByIdAndDelete(id);
      resolve("Deleted successfully");
    } catch (error) {
      reject(error);
    }
  });

export default { create, getByProduct, update, deleteReview };
