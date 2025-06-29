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

import { useCreatePlatform } from '../../../hooks/data/usePlatformsMutations';
import { platformSchema } from '../../../schemas/platform';
import { getDataForm } from '../../../utils/getFormData';
import '../../styles/Forms.css';

export function CreatePlatform() {
  const createPlatform = useCreatePlatform();
  const { closeDialog } = useDialog();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = getDataForm({
      form: e.currentTarget,
      schema: platformSchema,
    });

    if (result.error) {
      toast.error('Error creating platform!');
      return;
    }

    createPlatform.mutate(result.data, {
      onSuccess: () => toast.success('Platform created successfully!'),
      onError: () => toast.error('Error creating platform!'),
    });

    closeDialog();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New platform</DialogTitle>
        <DialogClose />
      </DialogHeader>

      <form className='form' onSubmit={handleSubmit}>
        <div className='label'>
          <Label asterisk>Title</Label>
          <Input placeholder='Epic Games' name='title' />
        </div>

        <Label className='label'>
          Company
          <Input placeholder='Epic' name='company' />
        </Label>

        <Label className='label'>
          Acquisition year
          <Input type='date' placeholder='17/05/2019' name='acquisition_year' />
        </Label>

        <Label className='label'>
          Platform image (url)
          <Input placeholder='http://cdn....' name='image_url' />
        </Label>

        <DialogFooter>
          <Button type='submit'>
            <p>Save platform</p>
            <p>+</p>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
