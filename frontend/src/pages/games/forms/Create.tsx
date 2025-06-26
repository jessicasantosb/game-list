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
import { Textarea } from '../../../components/ui/textarea/Textarea';
import { useFetchCategories } from '../../../hooks/data/useCategoriesQueries';
import { useCreateGame } from '../../../hooks/data/useGamesMutations';
import { useFetchPlatforms } from '../../../hooks/data/usePlatformsQueries';
import { useDialog } from '../../../hooks/useDialog';
import { gameCreateSchema } from '../../../schemas/gameCreate';
import { getDataForm } from '../../../utils/getFormData';
import style from './Forms.module.css';

export function CreateGame() {
  const createGame = useCreateGame();
  const categories = useFetchCategories();
  const platforms = useFetchPlatforms();
  const { closeDialog } = useDialog();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = getDataForm({
      form: e.currentTarget,
      schema: gameCreateSchema,
    });

    if (result.error) {
      toast.error('You must fill in all fields!');
      return;
    }

    createGame.mutate(result.data, {
      onSuccess: () => toast.success('Game created successfully!'),
      onError: () => toast.error('Error creating game!'),
    });

    closeDialog();
  };

  return (
    <DialogContent className={style.content}>
      <DialogHeader>
        <DialogTitle className={style.title}>New Game</DialogTitle>
        <DialogClose className={style.close} />
      </DialogHeader>

      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.label}>
          <Label asterisk>Title</Label>
          <Input placeholder='Mario Kart 8' name='title' />
        </div>

        <Label className={style.label}>Description</Label>
        <div>
          <Textarea
            id='description'
            placeholder='Amazing game'
            name='description'
            className={style.textarea}
          />
        </div>

        <div className={style.containerData}>
          <div className={style.row}>
            <div className={style.formGroup}>
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
            <div className={style.formGroup}>
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
                variant='squared'
                name='acquisition_date'
              />
            </div>
            <div className={style.label}>
              <Label asterisk htmlFor='finish_date'>
                Finish Date
              </Label>
              <div>
                <Input
                  id='finish_date'
                  type='date'
                  variant='squared'
                  name='finish_date'
                />
              </div>
            </div>
          </div>

          <div className={style.row}>
            <div className={style.label}>
              <Label asterisk htmlFor='status'>
                Status
              </Label>
              <Select id='status' variant='modal' name='status'>
                <SelectGroup>
                  <SelectItem value={'Playing'}>Playing</SelectItem>
                  <SelectItem value={'Done'}>Done</SelectItem>
                  <SelectItem value={'Abandoned'}>Abandoned</SelectItem>
                </SelectGroup>
              </Select>
            </div>

            <div className={style.checkbox}>
              <Input type='checkbox' name='favorite' id='favorite' />
              <Label asterisk htmlFor='favorite'>
                Favorite
              </Label>
            </div>
          </div>
        </div>

        <Label className={style.label}>
          Imagem (URL)
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
