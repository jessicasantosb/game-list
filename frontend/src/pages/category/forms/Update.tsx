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
import { useUpdateCategory } from '../../../hooks/data/useCategoriesMutations';
import { useDialog } from '../../../hooks/useDialog';
import {
  categorySchema,
  type CategoryRequest,
} from '../../../schemas/category';
import { getDataForm } from '../../../utils/getFormData';

import type { CategoryResponse } from '../../../types/Category';
import '../../styles/Forms.css';

export function UpdateCategory({ category }: { category: CategoryResponse }) {
  const updateCategory = useUpdateCategory();
  const { closeDialog } = useDialog();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = getDataForm<CategoryRequest>({
      form: e.currentTarget,
      schema: categorySchema,
    });

    const error = result.error
    
    if (error) {
      const messages = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join('\n');
      toast.error(messages); 
      return;
    }

    updateCategory.mutate(
      {
        data: result.data,
        id: category._id,
      },
      {
        onSuccess: () => toast.success('Category updated successfully!'),
        onError: () => toast.error('Error updating category!'),
      },
    );

    closeDialog();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit category</DialogTitle>
        <DialogClose />
      </DialogHeader>

      <form className='form' onSubmit={handleSubmit}>
        <div className='label'>
          <Label asterisk>Title</Label>
          <Input name='title' defaultValue={category.title} />
        </div>

        <Label className='label'>
          Description
          <Textarea name='description' defaultValue={category.description} />
        </Label>

        <DialogFooter>
          <Button type='submit'>Edit category</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
