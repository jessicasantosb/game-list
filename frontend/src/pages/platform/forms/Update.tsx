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
import { useDialog } from '../../../hooks/useDialog';
import { toInputDateString } from '../../../utils/toInputDateString';

import { useUpdatePlatform } from '../../../hooks/data/usePlatformsMutations';

import {
  platformSchema,
  type PlatformRequest,
} from '../../../schemas/platform';
import type { PlatformResponse } from '../../../types/Platform';
import { getDataForm } from '../../../utils/getFormData';
import style from './Forms.module.css';

export function UpdatePlatform({ platform }: { platform: PlatformResponse }) {
  const updatePlatform = useUpdatePlatform();
  const { closeDialog } = useDialog();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = getDataForm<PlatformRequest>({
      form: e.currentTarget,
      schema: platformSchema,
    });

    if (result.error) {
      toast.error('You must fill in all fields!');
      return;
    }

    updatePlatform.mutate(
      {
        data: result.data,
        id: platform._id,
      },
      {
        onSuccess: () => toast.success('Platform updated successfully!'),
        onError: () => toast.error('Error updating platform!'),
      },
    );

    closeDialog();
  };

  return (
    <DialogContent className={style.content}>
      <DialogHeader>
        <DialogTitle className={style.title}>Edit platform</DialogTitle>
        <DialogClose />
      </DialogHeader>

      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.label}>
          <Label asterisk>Title</Label>
          <Input name='title' defaultValue={platform.title} />
        </div>

        <Label className={style.label}>
          Company
          <Input name='company' defaultValue={platform.company} />
        </Label>

        <Label className={style.label}>
          Acquisition year
          <Input
            type='date'
            name='acquisition_year'
            defaultValue={toInputDateString(platform.acquisition_year)}
          />
        </Label>

        <Label className={style.label}>
          Platform image (url)
          <Input name='image_url' defaultValue={platform.image_url} />
        </Label>

        <DialogFooter>
          <Button type='submit'>
            <p>Edit platform</p>
            <p>+</p>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
