import Game from '@/models/game';

type UpdateGameProps = {
  id: string;
  data: Partial<{
    image_url?: string;
    title?: string;
    description?: string;
    category?: string;
    platform?: string;
    status?: string;
    favorite?: boolean;
    acquisition_date?: Date;
    finish_date?: Date;
  }>;
};

export const updateById = async ({ id, data }: UpdateGameProps) => {
  try {
    const updated = await Game.findByIdAndUpdate(id, { $set: data });

    if (!updated) {
      return new Error('Game not found.');
    }
    return updated;
  } catch (error) {
    console.log(
      `UPDATE_GAME: ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Error('Error updating game.');
  }
};
