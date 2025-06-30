import { useState, type FormEvent } from 'react';
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
import { Textarea } from '../../../components/ui/textarea/Textarea';
import { useFetchCategories } from '../../../hooks/data/useCategoriesQueries';
import { useCreateGame } from '../../../hooks/data/useGamesMutations';
import { useFetchPlatforms } from '../../../hooks/data/usePlatformsQueries';
import { useDialog } from '../../../hooks/useDialog';
import { gameSchema } from '../../../schemas/game';
import { getDataForm } from '../../../utils/getFormData';
import style from '../../styles/Forms.module.css';

import type { Status } from '../../../types/Game';

export function CreateGame() {
  const [status, setStatus] = useState<Status>('Playing');
  const createGame = useCreateGame();
  const categories = useFetchCategories();
  const platforms = useFetchPlatforms();
  const { closeDialog } = useDialog();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = getDataForm({
      form: e.currentTarget,
      schema: gameSchema,
    });

    const error = result.error;

    if (error) {
      const firstError = error.errors[0];
      toast.error(`${firstError.path.join('.')}: ${firstError.message}`);
      return;
    }

    createGame.mutate(result.data, {
      onSuccess: () => toast.success('Game created successfully!'),
      onError: () => toast.error('Error creating game!'),
    });

    closeDialog();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New Game</DialogTitle>
        <DialogClose />
      </DialogHeader>

      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.label}>
          <Label asterisk>Title</Label>
          <Input placeholder='SuperTux' name='title' autoFocus />
        </div>

        <Label className={style.label}>
          Description
          <Textarea
            id='description'
            placeholder='A classic 2D platformer'
            name='description'
          />
        </Label>

        <div className={style.rowWrapper}>
          <div className={style.row}>
            <div className={style.label}>
              <Label asterisk htmlFor='category'>
                Category
              </Label>
              <Select id='category' variant='modal' name='category'>
                <SelectGroup>
                  <SelectItem value=''>Select Category</SelectItem>
                  {categories.data?.categories.map((category) => (
                    <SelectItem key={category._id} value={category.title}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </Select>
            </div>

            <div className={style.label}>
              <Label htmlFor='platform'>Platform</Label>
              <Select id='platform' variant='modal' name='platform'>
                <SelectGroup>
                  <SelectItem value=''>Select Platform</SelectItem>
                  {platforms.data?.platforms.map((platform) => (
                    <SelectItem key={platform._id} value={platform.title}>
                      {platform.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </Select>
            </div>
          </div>

          <div className={style.row}>
            <div className={style.label}>
              <Label asterisk>Acquisition date</Label>
              <Input
                id='acquisition_date'
                type='date'
                name='acquisition_date'
              />
            </div>
            {status !== 'Playing' && (
              <div className={style.label}>
                <Label asterisk htmlFor='finish_date'>
                  Finish Date
                </Label>
                <Input id='finish_date' type='date' name='finish_date' />
              </div>
            )}
          </div>

          <div className={style.row}>
            <div className={style.label}>
              <Label asterisk htmlFor='status'>
                Status
              </Label>
              <Select
                id='status'
                variant='modal'
                name='status'
                onChange={(e) => setStatus(e.target.value as Status)}>
                <SelectGroup>
                  <SelectItem value={'Playing'}>Playing</SelectItem>
                  <SelectItem value={'Done'}>Done</SelectItem>
                  <SelectItem value={'Abandoned'}>Abandoned</SelectItem>
                </SelectGroup>
              </Select>
            </div>

            <div className={style.checkbox}>
              <Input type='checkbox' name='favorite' id='favorite' />
              <Label htmlFor='favorite'>Favorite</Label>
            </div>
          </div>
        </div>

        <Label className={style.label}>
          Image (URL)
          <Input
            id='image_url'
            type='text'
            placeholder='http://cdn...'
            name='image_url'
          />
        </Label>

        <DialogFooter>
          <Button type='submit'>CREATE</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
