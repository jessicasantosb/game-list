import Game from '@/models/game';

type FavoriteGameProps = {
  id: string;
  favorite: boolean;
};

export const favoriteById = async ({ id, favorite }: FavoriteGameProps) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(
      id,
      { favorite },
      { new: true },
    );

    if (!updatedGame) {
      return new Error('Game not found.');
    }

    return updatedGame._id;
  } catch (error) {
    console.log(
      `FAVORITE_GAME: ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Error('Error updating favorite game.');
  }
};
