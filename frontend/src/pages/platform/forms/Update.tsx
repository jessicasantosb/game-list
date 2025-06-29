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
import { useUpdatePlatform } from '../../../hooks/data/usePlatformsMutations';
import { useDialog } from '../../../hooks/useDialog';
import {
  platformSchema,
  type PlatformRequest,
} from '../../../schemas/platform';
import { getDataForm } from '../../../utils/getFormData';
import { toInputDateString } from '../../../utils/toInputDateString';

import type { PlatformResponse } from '../../../types/Platform';

import '../../styles/Forms.css';

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
      toast.error('Error updating platform!');
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
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit platform</DialogTitle>
        <DialogClose />
      </DialogHeader>

      <form className='form' onSubmit={handleSubmit}>
        <div className='label'>
          <Label asterisk>Title</Label>
          <Input name='title' defaultValue={platform.title} />
        </div>

        <Label className='label'>
          Company
          <Input name='company' defaultValue={platform.company} />
        </Label>

        <Label className='label'>
          Acquisition year
          <Input
            type='date'
            name='acquisition_year'
            defaultValue={toInputDateString(platform.acquisition_year)}
          />
        </Label>

        <Label className='label'>
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
