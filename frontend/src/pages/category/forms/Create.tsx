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
import { Textarea } from '../../../components/ui/textarea/Textarea';
import { useCreateCategory } from '../../../hooks/data/useCategoriesMutations';
import { useDialog } from '../../../hooks/useDialog';
import { categorySchema } from '../../../schemas/category';
import { getDataForm } from '../../../utils/getFormData';
import '../../styles/Forms.css';

export function CreateCategory() {
  const createCategory = useCreateCategory();
  const { closeDialog } = useDialog();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = getDataForm({
      form: e.currentTarget,
      schema: categorySchema,
    });

    if (result.error) {
      toast.error('Error creating category!');
      return;
    }

    createCategory.mutate(result.data, {
      onSuccess: () => toast.success('Category created successfully!'),
      onError: () => toast.error('Error creating category!'),
    });

    closeDialog();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New category</DialogTitle>
        <DialogClose />
      </DialogHeader>

      <form className='form' onSubmit={handleSubmit}>
        <div className='label'>
          <Label asterisk>Title</Label>
          <Input name='title' placeholder='Simulation' />
        </div>

        <Label className='label'>
          Description
          <Textarea
            name='description'
            placeholder='Replicates real-world or imagined activities in detail.'
          />
        </Label>

        <DialogFooter>
          <Button type='submit'>
            <p>Save category</p>
            <p>+</p>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
