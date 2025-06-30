import { Button } from '../../../components/ui/button/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog/Dialog';
import { Input } from '../../../components/ui/input/Input';
import { Label } from '../../../components/ui/label/Label';
import {
  Select,
  SelectGroup,
  SelectItem,
} from '../../../components/ui/select/Select';
import { Textarea } from '../../../components/ui/textarea/Textarea';
import { toInputDateString } from '../../../utils/toInputDateString';
import style from '../../styles/Forms.module.css';

import type { GameResponse } from '../../../types/Game';
import type { HTMLAttributes, ReactNode } from 'react';

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
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Details: {game.title}</DialogTitle>
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

        <div className={style.rowWrapper}>
          <div className={style.row}>
            <div className={style.label}>
              <Label asterisk>Category</Label>
              <Select variant='disable' disabled>
                <SelectGroup>
                  <SelectItem>{game.category}</SelectItem>
                </SelectGroup>
              </Select>
            </div>

            <div className={style.label}>
              <Label asterisk>Plataform</Label>
              <Select variant='disable' disabled>
                <SelectGroup>
                  <SelectItem>{game.platform}</SelectItem>
                </SelectGroup>
              </Select>
            </div>
          </div>

          <div className={style.row}>
            <div className={style.label}>
              <Label asterisk>Acquisition date</Label>
              <Input
                type='date'
                readOnly
                value={toInputDateString(game.acquisition_date)}
              />
            </div>

            <div className={style.label}>
              <Label asterisk htmlFor='finish_date'>
                Finish Date
              </Label>
              <Input
                type='date'
                readOnly
                value={toInputDateString(game.finish_date)}
              />
            </div>
          </div>

          <div className={style.row}>
            <div className={style.label}>
              <Label asterisk htmlFor='status'>
                Status
              </Label>
              <Select variant='disable' value={game.status} disabled>
                <SelectGroup>
                  <SelectItem>{game.status}</SelectItem>
                </SelectGroup>
              </Select>
            </div>

            <div className={style.checkbox}>
              <Input type='checkbox' readOnly checked={game.favorite} />
              <Label htmlFor='favorite'>Favorite</Label>
            </div>
          </div>
        </div>

        <Label className={style.label}>
          Image (URL)
          <Input value={game.image_url} readOnly />
        </Label>
      </form>

      <DialogFooter>
        <Dialog>
          <DialogTrigger>
            <Button style={{ backgroundColor: '#fd4760' }}>DELETE</Button>
          </DialogTrigger>
          {deleteForm}
        </Dialog>
        <Dialog>
          <DialogTrigger>
            <Button>EDIT</Button>
          </DialogTrigger>
          {updateForm}
        </Dialog>
      </DialogFooter>
    </DialogContent>
  );
}
