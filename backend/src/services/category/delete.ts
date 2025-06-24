import Category from '@/models/category';
import Game from '@/models/game';

export const deleteById = async (id: string) => {
  try {
    const category = await Category.findById(id);

    if (!category) return new Error('Category not found');

    const gamesCount = await Game.countDocuments({ category: category.title });

    if (gamesCount > 0) {
      return new Error('Cannot delete category with associated games');
    }

    category.is_deleted = true;
    await category.save();

    return category._id;
  } catch (error) {
    console.log(
      `DELETE_CATEGORY: ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Error('Error deleting category');
  }
};
