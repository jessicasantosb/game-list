import Category from '@/models/category';

type GetAllCategoryProps = {
  user_id: string;
  per_page: number;
  page: number;
  sort: string;
  dir: 'asc' | 'desc';
};

export const getAll = async ({
  user_id,
  per_page,
  page,
  sort,
  dir,
}: GetAllCategoryProps) => {
  const skip = (page - 1) * per_page;

  const filters = {
    user_id,
    is_deleted: false,
  };

  try {
    const [categories, count] = await Promise.all([
      await Category.find(filters)
        .limit(per_page)
        .skip(skip)
        .sort({ [sort]: dir }),
      Category.countDocuments({
        user_id,
        is_deleted: false,
      }),
    ]);

    return { categories, count };
  } catch (error) {
    console.log(
      `GET_ALL_CATEGORIES: ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Error('Error returning categories');
  }
};
