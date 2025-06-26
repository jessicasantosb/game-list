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
import { Label } from '../../../../components/ui/label/Label';
import {
  Select,
  SelectGroup,
  SelectItem,
} from '../../../../components/ui/select/Select';
import { Textarea } from '../../../../components/ui/textarea/Textarea';

import type { GameResponse } from '../../../../types/Game';
import style from './Details.module.css';

type UpdateModalProps = HTMLAttributes<HTMLElement> & {
  updateForm?: ReactNode;
  deleteForm?: ReactNode;
  game: GameResponse;
};

export function DetailsGame({
  updateForm,
  deleteForm,
  game,
}: UpdateModalProps) {
  if (!game) return null;

  return (
    <DialogContent className={style.content}>
      <DialogHeader>
        <DialogTitle className={style.title}>Details: {game.title}</DialogTitle>
        <DialogClose />
      </DialogHeader>

      <form className={style.form}>
        <div className={style.label}>
          <Label asterisk>Title</Label>

          <Input value={game.title} readOnly />
        </div>

        <Label className={style.label}>
          Description
          <Textarea value={game.description} readOnly />
        </Label>

        <div className={style.data}>
          <div className={style.row}>
            <div className={style.label}>
              <Label asterisk>Category</Label>
              <Select variant='disable' value={game.category} disabled>
                <SelectGroup>
                  <SelectItem>{game.category}</SelectItem>
                </SelectGroup>
              </Select>
            </div>
            <div className={style.formGroup}>
              <Label asterisk htmlFor='plataform'>
                Plataform
              </Label>
              <Select variant='disable' value={game.platform} disabled>
                <SelectGroup>
                  <SelectItem>{game.platform}</SelectItem>
                </SelectGroup>
              </Select>
            </div>
          </div>

          <div className={style.row}>
            <div className={style.formGroup}>
              <Label asterisk htmlFor='status'>
                Status
              </Label>
              <Select variant='disable' value={game.status} disabled>
                <SelectGroup>
                  <SelectItem>{game.status}</SelectItem>
                </SelectGroup>
              </Select>
            </div>
          </div>
        </div>

        <Label className={style.label}>
          Imagem (URL)
          <Input value={game.image_url} readOnly />
        </Label>
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
  );
}
