import Category from '@/models/category';

type CreateCategoryProps = {
  user_id: string;
  title: string;
  description?: string;
};

export const create = async ({
  user_id,
  title,
  description,
}: CreateCategoryProps) => {
  try {
    const category = new Category({
      user_id,
      title,
      description,
    });

    const { _id } = await category.save();
    return _id;
  } catch (error) {
    console.log(
      `CREATE_CATEGORY: ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Error('Error creating category');
  }
};
