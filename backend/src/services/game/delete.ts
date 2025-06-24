import Game from '@/models/game';

type DeleteGameProps = {
  id: string;
};

export const deleteById = async ({ id }: DeleteGameProps) => {
  try {
    const deleted = await Game.findByIdAndUpdate(id, { is_deleted: true });

    if (!deleted) {
      return new Error('Game not found.');
    }

    return deleted;
  } catch (error) {
    console.log(
      `DELETE_GAME: ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Error('Error deleting game.');
  }
};
