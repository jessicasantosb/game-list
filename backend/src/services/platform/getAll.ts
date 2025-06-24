import Platform from '@/models/platform';

type GetAllPlatformProps = {
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
}: GetAllPlatformProps) => {
  const skip = (page - 1) * per_page;

  const filters = {
    user_id,
    is_deleted: false,
  };

  try {
    const [platforms, count] = await Promise.all([
      Platform.find(filters)
        .limit(per_page)
        .skip(skip)
        .sort({ [sort]: dir }),
      Platform.countDocuments({
        user_id,
        is_deleted: false,
      }),
    ]);

    return { platforms, count };
  } catch (error) {
    console.log(
      `GET_ALL_PLATFORMS: ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Error('Error returning platforms');
  }
};
