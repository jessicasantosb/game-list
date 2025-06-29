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
import '../../styles/Forms.css';

type Status = 'Abandoned' | 'Done' | 'Playing';

export function CreateGame() {
  const [status, setStatus] = useState<Status>();
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

    if (result.error) {
      toast.error('Error creating game!');
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

      <form className='form' onSubmit={handleSubmit}>
        <div className='label'>
          <Label asterisk>Title</Label>
          <Input placeholder='SuperTux' name='title' />
        </div>

        <Label className='label'>
          Description
          <Textarea
            id='description'
            placeholder='A classic 2D platformer'
            name='description'
          />
        </Label>

        <div className='rowWrapper'>
          <div className='row'>
            <div className='label'>
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

            <div className='label'>
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

          <div className='row'>
            <div className='label'>
              <Label asterisk>Acquisition date</Label>
              <Input
                id='acquisition_date'
                type='date'
                name='acquisition_date'
              />
            </div>
            {status !== 'Playing' && (
              <div className='label'>
                <Label asterisk htmlFor='finish_date'>
                  Finish Date
                </Label>
                <Input id='finish_date' type='date' name='finish_date' />
              </div>
            )}
          </div>

          <div className='row'>
            <div className='label'>
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

            <div className='checkbox'>
              <Input type='checkbox' name='favorite' id='favorite' />
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
