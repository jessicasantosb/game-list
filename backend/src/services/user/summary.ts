import Category from '../../models/category';
import Game from '../../models/game';
import Platform from '../../models/platform';

export const summary = async (user_id: string) => {
  try {
    const [gamesCount, favoriteGamesCount, categoriesCount, platformCount] =
      await Promise.all([
        Game.countDocuments({
          user_id,
          is_deleted: false,
        }),
        Game.countDocuments({
          user_id,
          favorite: true,
          is_deleted: false,
        }),
        Category.countDocuments({
          user_id,
          is_deleted: false,
        }),
        Platform.countDocuments({
          user_id,
          is_deleted: false,
        }),
      ]);

    return { gamesCount, favoriteGamesCount, categoriesCount, platformCount };
  } catch (error) {
    console.log(
      `SUMMARY:  ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Error('Error returning summary');
  }
};
