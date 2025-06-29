import { type FormEvent } from 'react';
import { toast } from 'react-toastify';

import { Button } from '../../../components/ui/button/Button';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog/Dialog';
import { Input } from '../../../components/ui/input/Input';
import { Label } from '../../../components/ui/label/Label';
import {
  Select,
  SelectGroup,
  SelectItem,
} from '../../../components/ui/select/Select';
import { useDialog } from '../../../hooks/useDialog';
import type { GameResponse } from '../../../types/Game';

import { Textarea } from '../../../components/ui/textarea/Textarea';
import { useFetchCategories } from '../../../hooks/data/useCategoriesQueries';
import { useUpdateGame } from '../../../hooks/data/useGamesMutations';
import { useFetchPlatforms } from '../../../hooks/data/usePlatformsQueries';
import { gameSchema, type GameRequest } from '../../../schemas/game';
import { getDataForm } from '../../../utils/getFormData';
import { toInputDateString } from '../../../utils/toInputDateString';
import '../../styles/Forms.css';

export function UpdateGame({ game }: { game: GameResponse }) {
  const platforms = useFetchPlatforms();
  const categories = useFetchCategories();
  const updateGame = useUpdateGame();
  const { closeDialog } = useDialog();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = getDataForm<GameRequest>({
      form: e.currentTarget,
      schema: gameSchema,
    });

    if (result.error) {
      toast.error('You must fill in all required fields!');
      return;
    }

    updateGame.mutate(
      {
        data: result.data,
        id: game._id,
      },
      {
        onSuccess: () => toast.success('Game updated successfully!'),
        onError: () => toast.error('Error updating game!'),
      },
    );

    closeDialog();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editing: {game.title}</DialogTitle>
        <DialogClose />
      </DialogHeader>

      <form className='form' onSubmit={handleSubmit}>
        <div className='label'>
          <Label asterisk htmlFor='title'>
            Title
          </Label>
          <Input id='title' defaultValue={game.title} name='title' />
        </div>

        <Label className='label'>
          Description
          <Textarea
            id='description'
            defaultValue={game.description}
            name='description'
          />
        </Label>

        <div className='rowWrapper'>
          <div className='row'>
            <div className='label'>
              <Label htmlFor='category' asterisk>
                Category
              </Label>
              <Select
                id='category'
                variant='modal'
                defaultValue={game.category}
                name='category'>
                <SelectGroup>
                  <SelectItem defaultValue=''>Select Category</SelectItem>
                  {categories.data?.categories?.map((category) => (
                    <SelectItem
                      key={category.title}
                      defaultValue={category.title}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </Select>
            </div>
            <div className='label'>
              <Label htmlFor='platform' asterisk>
                Platform
              </Label>
              <Select
                id='platform'
                variant='modal'
                defaultValue={game.platform}
                name='platform'>
                <SelectGroup>
                  <SelectItem defaultValue=''>Select Platform</SelectItem>
                  {platforms.data?.platforms.map((platform) => (
                    <SelectItem
                      key={platform.title}
                      defaultValue={platform.title}>
                      {platform.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </Select>
            </div>
          </div>

          <div className='row'>
            <div className='label'>
              <Label asterisk>Acquisition date</Label>
              <Input
                id='acquisition_date'
                type='date'
                variant='squared'
                name='acquisition_date'
                defaultValue={toInputDateString(game.acquisition_date)}
              />
            </div>

            <div className='label'>
              <Label asterisk htmlFor='finish_date'>
                Finish Date
              </Label>
              <Input
                id='finish_date'
                type='date'
                variant='squared'
                name='finish_date'
                defaultValue={toInputDateString(game.finish_date)}
              />
            </div>
          </div>

          <div className='row'>
            <div className='label'>
              <Label htmlFor='status' asterisk>
                Status
              </Label>
              <Select
                id='status'
                variant='modal'
                defaultValue={game.status}
                name='status'>
                <SelectGroup>
                  <SelectItem defaultValue={'Playing'}>Playing</SelectItem>
                  <SelectItem defaultValue={'Done'}>Done</SelectItem>
                  <SelectItem defaultValue={'Abandoned'}>Abandoned</SelectItem>
                </SelectGroup>
              </Select>
            </div>

            <div className='checkbox'>
              <Input
                type='checkbox'
                name='favorite'
                defaultChecked={game.favorite}
                id='favorite'
              />
              <Label htmlFor='favorite'>Favorite</Label>
            </div>
          </div>
        </div>

        <Label className='label'>
          Image (URL)
          <Input
            id='image_url'
            type='text'
            placeholder='http://cdn...'
            defaultValue={game.image_url}
            name='image_url'
          />
        </Label>
        <DialogFooter>
          <Button type='submit'>CONFIRM</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
