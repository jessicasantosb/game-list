import { useEffect, useState } from 'react';
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
import { useCategory } from '../../../../hooks/useCategory';
import { useDialog } from '../../../../hooks/useDialog';
import { useGame } from '../../../../hooks/useGame';
import { usePlatform } from '../../../../hooks/usePlatform';
import { type CategoryProps } from '../../../../types/Category';
import { type PlatformProps } from '../../../../types/Platform';
import { validateForm } from '../../../../utils/validateForm';
import style from './Create.module.css';

export function CreateGame({ onCreated }: { onCreated?: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [platform, setPlatform] = useState('');
  const { closeDialog } = useDialog();
  const [categoryList, setCategoryList] = useState<CategoryProps[]>([]);
  const [platformList, setPlatformList] = useState<PlatformProps[]>([]);
  const [status, setStatus] = useState<'Playing' | 'Done' | 'Abandoned'>(
    'Playing',
  );
  const [acquisition_date, setAcquisitionDate] = useState(Date);
  const [finish_date, setFinishDate] = useState(Date);
  const [favorite, setFavorite] = useState(false);
  const [image_url, setUrlImage] = useState('');
  const { getAll: getAllCategories } = useCategory();
  const { getAll: getAllPlatforms } = usePlatform();

  useEffect(() => {
    const fetchData = async () => {
      const categoryList = await getAllCategories({});
      const platformList = await getAllPlatforms({});
      setPlatformList(platformList);
      setCategoryList(categoryList);
    };
    fetchData();
  }, []);

  const { create, error } = useGame();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryList.length || !platform.length) {
      toast.error(
        'Please create the required items first (category and/or platform).',
      );
      return;
    }

    const isValid = validateForm(title, image_url);

    if (!isValid) return;
    if (!category || !acquisition_date || !status) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (status !== 'Playing' && !finish_date) {
      toast.error('Finish date is required unless status is Playing');
      return;
    }

    try {
      await create({
        title,
        description,
        category,
        acquisition_date: new Date(acquisition_date),
        status,
        platform,
        finish_date: new Date(finish_date),
        image_url,
        favorite,
      });
      toast.success('Game registred success!');
      closeDialog();
      if (onCreated) onCreated(); // <-- Chama a função para atualizar a lista!
    } catch {
      console.log(error);
      toast.error('Error to create game');
    }
  };

  return (
    <div className={style.newGame}>
      <DialogContent className={style.dialogContent}>
        <DialogHeader>
          <DialogTitle className={style.dialogTitle}>New Game</DialogTitle>
          <DialogClose className={style.dialogClose} />
        </DialogHeader>

        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <Label asterisk htmlFor='title'>
              Title
            </Label>
            <div>
              <Input
                placeholder='Mario Kart 8'
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className={style.formGroup}>
            <Label htmlFor='description'>Description</Label>
            <div>
              <textarea
                id='description'
                placeholder='Amazing game'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={style.textarea}
              />
            </div>
          </div>

          <div className={style.containerData}>
            <div className={style.containerRow}>
              <div className={style.formGroup}>
                <Label asterisk htmlFor='category'>
                  Category
                </Label>
                <Select
                  id='category'
                  variant='modal'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                  <SelectGroup>
                    <SelectItem value=''>Select Category</SelectItem>
                    {categoryList?.map((cat) => (
                      <SelectItem key={cat.title} value={cat.title}>
                        {cat.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </Select>
              </div>
              <div className={style.formGroup}>
                <Label htmlFor='platform'>Platform</Label>
                <Select
                  id='platform'
                  variant='modal'
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}>
                  <SelectGroup>
                    <SelectItem value=''>Select Platform</SelectItem>
                    {platformList?.map((plat) => (
                      <SelectItem key={plat.title} value={plat.title}>
                        {plat.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </Select>
              </div>
            </div>

            <div className={style.containerRow}>
              <div className={style.formGroup}>
                <Label asterisk htmlFor='acquisition_date'>
                  Acquisition date
                </Label>
                <div>
                  <Input
                    id='acquisition_date'
                    type='date'
                    variant='squared'
                    value={acquisition_date}
                    onChange={(e) => setAcquisitionDate(e.target.value)}
                  />
                </div>
              </div>
              <div className={style.formGroup}>
                <Label asterisk htmlFor='finish_date'>
                  Finish Date
                </Label>
                <div>
                  <Input
                    id='finish_date'
                    type='date'
                    variant='squared'
                    value={finish_date}
                    onChange={(e) => setFinishDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={style.containerRow}>
              <div className={style.formGroup}>
                <Label asterisk htmlFor='status'>
                  Status
                </Label>
                <Select
                  id='status'
                  variant='modal'
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value as 'Playing' | 'Done' | 'Abandoned',
                    )
                  }>
                  <SelectGroup>
                    <SelectItem value={'Playing'}>Playing</SelectItem>
                    <SelectItem value={'Done'}>Done</SelectItem>
                    <SelectItem value={'Abandoned'}>Abandoned</SelectItem>
                  </SelectGroup>
                </Select>
              </div>
              <div className={style.formGroup}>
                <div className={style.checkbox}>
                  <div>
                    <input
                      type='checkbox'
                      name='favorite'
                      id='favorite'
                      value={status}
                      onChange={(e) => setFavorite(e.target.checked)}
                    />
                  </div>
                  <Label asterisk htmlFor='favorite'>
                    Favorite
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className={style.formGroup}>
            <Label htmlFor='image_url'>Imagem (URL)</Label>
            <div>
              <Input
                id='image_url'
                type='text'
                placeholder='http://cdn...'
                value={image_url}
                onChange={(e) => setUrlImage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>
              <p className={style.button}>CREATE</p>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </div>
  );
}
