import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../../../../components/ui/button/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../components/ui/dialog/Dialog';
import { Input } from '../../../../components/ui/input/Input';
import {
  Select,
  SelectGroup,
  SelectItem,
} from '../../../../components/ui/select/Select';
import type { GameProps } from '../../../../types/Game';
import style from './Details.module.css';

type UpdateModalProps = HTMLAttributes<HTMLElement> & {
  updateForm?: ReactNode;
  deleteForm?: ReactNode;
  game: GameProps;
};

export function DetailsGame({
  updateForm,
  deleteForm,
  game,
}: UpdateModalProps) {
  // const [new_title] = useState(game.title);
  // const [new_description] = useState(game.description);
  // const [category] = useState(game.category);
  // const [new_status] = useState(game.status);
  // const [plataform] = useState(game.platform);
  // const [url_image] = useState(game.image_url);

  return (
    <div className={style.newGame}>
      <DialogContent className={style.dialogContent}>
        <DialogHeader>
          <DialogTitle className={style.dialogTitle}>
            Details: {game.title}
          </DialogTitle>
          <DialogClose className={style.dialogClose} />
        </DialogHeader>

        <form className={style.form}>
          <div className={style.formGroup}>
            <label>
              Title<span className={style.required}>*</span>
            </label>
            <div>
              <Input placeholder={'title'} value={game.title} readOnly />
            </div>
          </div>

          <div className={style.formGroup}>
            <label>Description</label>
            <div>
              <textarea
                placeholder={'description'}
                value={game.description}
                readOnly
                className={style.textarea}
              />
            </div>
          </div>

          <div className={style.containerData}>
            <div className={style.containerRow}>
              <div className={style.formGroup}>
                <label htmlFor='category'>
                  Category <span className={style.required}>*</span>
                </label>
                <Select variant='disable' value={game.category} disabled>
                  <SelectGroup>
                    <SelectItem>{game.category}</SelectItem>
                  </SelectGroup>
                </Select>
              </div>
              <div className={style.formGroup}>
                <label htmlFor='plataform'>
                  Plataform <span className={style.required}>*</span>
                </label>
                <Select variant='disable' value={game.platform} disabled>
                  <SelectGroup>
                    <SelectItem>{game.platform}</SelectItem>
                  </SelectGroup>
                </Select>
              </div>
            </div>

            <div className={style.containerRow}>
              <div className={style.formGroup}>
                <label htmlFor='status'>
                  Status <span className={style.required}>*</span>
                </label>
                <Select variant='disable' value={game.status} disabled>
                  <SelectGroup>
                    <SelectItem value={''}>{game.status}</SelectItem>
                  </SelectGroup>
                </Select>
              </div>
            </div>
          </div>

          <div className={style.formGroup}>
            <label htmlFor='image_url'>Imagem (URL)</label>
            <div>
              <Input
                type='text'
                placeholder='http://cdn...'
                value={game.image_url}
                readOnly
              />
            </div>
          </div>
        </form>

        <DialogFooter>
          <Dialog>
            <DialogTrigger>
              <Button>
                <p className={style.button}>DELETE</p>
              </Button>
            </DialogTrigger>
            {deleteForm}
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <Button>
                <p className={style.button}>EDIT</p>
              </Button>
            </DialogTrigger>
            {updateForm}
          </Dialog>
        </DialogFooter>
      </DialogContent>
    </div>
  );
}
