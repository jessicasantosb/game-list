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
import type { EditGamesWithOnCreatedProps } from '../../../../types/Game';
import { type PlatformProps } from '../../../../types/Platform';
import { validateForm } from '../../../../utils/validateForm';

import style from './Update.module.css';

export function UpdateGame({ game, onCreated }: EditGamesWithOnCreatedProps) {
  const [title, setNewTitle] = useState(game.title);
  const [description, setNewDescription] = useState(game.description);
  const [category, setCategory] = useState(game.category);
  const [status, setNewStatus] = useState(game.status);
  const [platform, setPlatform] = useState(game.platform);
  const [image_url, setUrlImage] = useState(game.image_url);
  const [acquisition_date] = useState(game.acquisition_date);
  const [finish_date] = useState(game.finish_date);
  const [categoryList, setCategoryList] = useState<CategoryProps[]>([]);
  const [platformList, setPlatformList] = useState<PlatformProps[]>([]);
  const { getAll: getAllCategories } = useCategory();
  const { getAll: getAllPlatforms } = usePlatform();
  const { update } = useGame();
  const { closeDialog } = useDialog();

  const fetchData = async () => {
    const categoryList = await getAllCategories({});
    const platformList = await getAllPlatforms({});
    setPlatformList(platformList);
    setCategoryList(categoryList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm(title, image_url);

    if (!isValid) return;
    if (!category || !acquisition_date || !finish_date || !status) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      await update({
        itemId: game._id || '',
        gameData: {
          title,
          description,
          category,
          status,
          platform,
          image_url,
          acquisition_date,
          finish_date,
        },
      });

      toast.success('Game updated successfully');
      closeDialog();
      onCreated();
    } catch (error) {
      toast.error('Erro ao atualizar o game');
      console.error(error);
    }
  };

  return (
    <div className={style.newGame}>
      <DialogContent className={style.dialogContent}>
        <DialogHeader>
          <DialogTitle className={style.dialogTitle}>
            Editing: {game.title}
          </DialogTitle>
          <DialogClose className={style.dialogClose} />
        </DialogHeader>

        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <Label asterisk htmlFor='title'>
              Title
            </Label>
            <div>
              <Input
                id='title'
                placeholder={'title'}
                value={title}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
          </div>

          <div className={style.formGroup}>
            <Label htmlFor='description'>Description</Label>
            <div>
              <textarea
                id='description'
                placeholder={'description'}
                value={description}
                onChange={(e) => setNewDescription(e.target.value)}
                className={style.textarea}
              />
            </div>
          </div>

          <div className={style.containerData}>
            <div className={style.containerRow}>
              <div className={style.formGroup}>
                <Label htmlFor='category' asterisk>
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
                <Label htmlFor='platform' asterisk>
                  Platform
                </Label>
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
                <Label htmlFor='status' asterisk>
                  Status
                </Label>
                <Select
                  id='status'
                  variant='modal'
                  value={status}
                  onChange={(e) => setNewStatus(e.target.value)}>
                  <SelectGroup>
                    <SelectItem value={'Playing'}>Playing</SelectItem>
                    <SelectItem value={'Done'}>Done</SelectItem>
                    <SelectItem value={'Abandoned'}>Abandoned</SelectItem>
                  </SelectGroup>
                </Select>
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
            <Button>
              <p className={style.button}>CONFIRM</p>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      {/* <CustomPagination page={page} totalPages={totalPages} setPage={setPage} /> */}
    </div>
  );
}
