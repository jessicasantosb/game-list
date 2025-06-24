import Category from '@/models/category';

type UpdateByIdProps = {
  id: string;
  title: string;
  description?: string;
};

export const updateById = async ({
  id,
  title,
  description,
}: UpdateByIdProps) => {
  try {
    const category = await Category.findByIdAndUpdate(id, {
      title,
      description,
    });

    if (!category) return new Error('Category not found');

    return category._id;
  } catch (error) {
    console.log(
      `UPDATE_CATEGORY: ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Error('Error updating category');
  }
};
