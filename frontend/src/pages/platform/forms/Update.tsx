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
import { useDialog } from '../../../hooks/useDialog';
import { toInputDateString } from '../../../utils/toInputDateString';

import { useUpdatePlatform } from '../../../hooks/data/usePlatformsMutations';
import { platformUpdateSchema } from '../../../schemas/platformUpdate';
import type { PlatformResponse } from '../../../types/Platform';
import { getDataForm } from '../../../utils/getFormData';
import style from './Forms.module.css';

export function UpdatePlatform({ platform }: { platform: PlatformResponse }) {
  const [platformData, setPlatformData] = useState({
    title: platform.title,
    company: platform.company || '',
    year: platform.acquisition_year
      ? new Date(platform.acquisition_year)
      : undefined,
    imageUrl: platform.image_url || '',
  });
  const updatePlatform = useUpdatePlatform();
  const { closeDialog } = useDialog();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = getDataForm({
      form: e.currentTarget,
      schema: platformUpdateSchema,
    });

    if (result.error) {
      toast.error('You must fill in all fields!');
      return;
    }

    updatePlatform.mutate(
      { ...result.data, id: platform._id },
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
          <Input
            value={platformData.title}
            onChange={(e) =>
              setPlatformData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        <Label>
          Company
          <Input
            value={platformData.company}
            onChange={(e) =>
              setPlatformData((prev) => ({
                ...prev,
                company: e.target.value,
              }))
            }
          />
        </Label>

        <Label>
          Acquisition year
          <Input
            type='date'
            value={toInputDateString(platformData.year)}
            onChange={(e) =>
              setPlatformData((prev) => ({
                ...prev,
                year: e.target.value ? new Date(e.target.value) : undefined,
              }))
            }
          />
        </Label>

        <Label>
          Acquisition year
          <Input
            type='date'
            placeholder='YYYY-MM-DD'
            value={
              platformData.year ? toInputDateString(platformData.year) : ''
            }
            onChange={(e) =>
              setPlatformData((prev) => ({
                ...prev,
                year: e.target.value ? new Date(e.target.value) : undefined,
              }))
            }
          />
        </Label>

        <Label>
          Platform image (url)
          <Input
            value={platformData.imageUrl}
            onChange={(e) =>
              setPlatformData((prev) => ({
                ...prev,
                imageUrl: e.target.value,
              }))
            }
          />
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
