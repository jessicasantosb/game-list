import { useState, type FormEvent } from 'react';
import { toast } from 'react-toastify';

import { Button } from '../../../../components/ui/button/Button';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../../components/ui/dialog/Dialog';
import { Input } from '../../../../components/ui/input/Input';
import { Label } from '../../../../components/ui/label/Label';
import {
  Select,
  SelectGroup,
  SelectItem,
} from '../../../../components/ui/select/Select';
import { useDialog } from '../../../../hooks/useDialog';
import type { GameResponse } from '../../../../types/Game';

import { useFetchCategories } from '../../../../hooks/data/useCategoriesQueries';
import { useUpdateGame } from '../../../../hooks/data/useGamesMutations';
import { useFetchPlatforms } from '../../../../hooks/data/usePlatformsQueries';
import { gameUpdateSchema } from '../../../../schemas/gameUpdate';
import { getDataForm } from '../../../../utils/getFormData';
import style from './Update.module.css';

export function UpdateGame({ game }: { game: GameResponse }) {
  const [gameData, setGameData] = useState({
    title: game.title,
    description: game.description,
    category: game.category,
    platform: game.platform,
    image_url: game.image_url,
    status: game.status,
    favorite: game.favorite,
  });
  const platforms = useFetchPlatforms();
  const categories = useFetchCategories();
  const updateGame = useUpdateGame();
  const { closeDialog } = useDialog();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = getDataForm({
      form: e.currentTarget,
      schema: gameUpdateSchema,
    });

    if (result.error) {
      toast.error('You must fill in all fields!');
      return;
    }

    updateGame.mutate(
      { ...result.data, id: String(game._id) },
      {
        onSuccess: () => toast.success('Game updated successfully!'),
        onError: () => toast.error('Error updating game!'),
      },
    );

    closeDialog();
  };

  return (
    <DialogContent className={style.content}>
      <DialogHeader>
        <DialogTitle className={style.title}>Editing: {game.title}</DialogTitle>
        <DialogClose />
      </DialogHeader>

      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.label}>
          <Label asterisk htmlFor='title'>
            Title
          </Label>
          <Input
            id='title'
            placeholder={'title'}
            value={gameData.title}
            onChange={(e) =>
              setGameData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        <div className={style.label}>
          <Label htmlFor='description'>Description</Label>
          <div>
            <textarea
              id='description'
              placeholder={'description'}
              value={gameData.description}
              onChange={(e) =>
                setGameData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className={style.container}>
          <div className={style.row}>
            <div className={style.label}>
              <Label htmlFor='category' asterisk>
                Category
              </Label>
              <Select
                id='category'
                variant='modal'
                value={gameData.category}
                onChange={(e) =>
                  setGameData((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }>
                <SelectGroup>
                  <SelectItem value=''>Select Category</SelectItem>
                  {categories.data?.categories?.map((category) => (
                    <SelectItem key={category.title} value={category.title}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </Select>
            </div>
            <div className={style.label}>
              <Label htmlFor='platform' asterisk>
                Platform
              </Label>
              <Select
                id='platform'
                variant='modal'
                value={gameData.platform}
                onChange={(e) =>
                  setGameData((prev) => ({
                    ...prev,
                    platform: e.target.value,
                  }))
                }>
                <SelectGroup>
                  <SelectItem value=''>Select Platform</SelectItem>
                  {platforms.data?.platforms.map((platform) => (
                    <SelectItem key={platform.title} value={platform.title}>
                      {platform.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </Select>
            </div>
          </div>

          <div className={style.row}>
            <div className={style.label}>
              <Label htmlFor='status' asterisk>
                Status
              </Label>
              <Select
                id='status'
                variant='modal'
                value={gameData.status}
                onChange={(e) =>
                  setGameData((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }>
                <SelectGroup>
                  <SelectItem value={'Playing'}>Playing</SelectItem>
                  <SelectItem value={'Done'}>Done</SelectItem>
                  <SelectItem value={'Abandoned'}>Abandoned</SelectItem>
                </SelectGroup>
              </Select>
            </div>
          </div>
        </div>

        <div className={style.label}>
          <Label htmlFor='image_url'>Imagem (URL)</Label>

          <Input
            id='image_url'
            type='text'
            placeholder='http://cdn...'
            value={gameData.image_url}
            onChange={(e) =>
              setGameData((prev) => ({
                ...prev,
                image_url: e.target.value,
              }))
            }
          />
        </div>

        <DialogFooter>
          <Button>CONFIRM</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
