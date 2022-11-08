import { Category } from "@romalms/database/models";

export class CategoryService {
  static getAllCategory() {
    return Category.findAll({});
  }

  static getCategoryById(categoryId: number) {
    return Category.findByPk(categoryId);
  }

  static getCategoryByName(categoryName: string) {
    return Category.findOne({
      where: {
        categoryName,
      },
    });
  }
}
