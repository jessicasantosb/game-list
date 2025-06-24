import Game from '@/models/game';

type CreateProps = {
  image_url: string;
  title: string;
  description: string;
  category: string;
  platform: string;
  status: string;
  favorite: boolean;
  acquisition_date: Date;
  finish_date: Date;
  user_id: string;
};

export const create = async ({
  image_url,
  title,
  description,
  category,
  platform,
  status,
  favorite,
  acquisition_date,
  finish_date,
  user_id,
}: CreateProps) => {
  try {
    const game = new Game({
      image_url,
      title,
      description,
      category,
      platform,
      status,
      favorite,
      acquisition_date,
      finish_date,
      user_id,
    });

    const { _id } = await game.save();
    return _id;
  } catch (error) {
    console.log(
      `CREATE_GAME: ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Error('Error creating game.');
  }
};
