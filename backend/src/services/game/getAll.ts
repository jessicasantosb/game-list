import Game from '@/models/game';

type getAllProps = {
  user_id: string;
  per_page: number;
  page: number;
  title?: string;
  category?: string;
  favorite?: boolean;
  sort: string;
  dir: 'asc' | 'desc';
};

export const getAll = async ({
  user_id,
  per_page,
  page,
  title,
  category,
  favorite,
  sort,
  dir,
}: getAllProps) => {
  const skip = (page - 1) * per_page;

  const filters = {
    user_id,
    is_deleted: false,
    ...(title && { title: { $regex: title, $options: 'i' } }),
    ...(category && { category }),
    ...(favorite && { favorite }),
  };

  try {
    const [games, count] = await Promise.all([
      Game.find(filters)
        .limit(per_page)
        .skip(skip)
        .sort({ [sort]: dir }),
      Game.countDocuments({
        user_id,
        is_deleted: false,
      }),
    ]);

    return { games, count };
  } catch (error) {
    console.log(
      `GET_ALL: ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Error('Error retrieving games.');
  }
};
