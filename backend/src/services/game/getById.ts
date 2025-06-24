import Game from '@/models/game';

export const getById = async (id: string) => {
  try {
    const game = await Game.findById(id);

    return game;
  } catch (error) {
    console.log(
      `GET_BY_ID_GAME: ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Error('Error retrieving game.');
  }
};
