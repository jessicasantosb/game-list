export type GameProps = {
  _id?: string;
  image_url: string;
  title: string;
  description: string;
  category: string;
  platform: string;
  status: string;
  favorite?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  acquisition_date: Date;
  finish_date: Date | null;
  is_deleted?: boolean;
};

export type EditGameProps = {
  itemId: string;
  gameData: Omit<
    GameProps,
    '_id' | 'createdAt' | 'updatedAt' | 'is_deleted' | 'favorite'
  >;
};

export type EditGamesWithOnCreatedProps = {
  onCreated: () => void;
  game: GameProps;
};
