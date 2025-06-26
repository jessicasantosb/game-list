import { type FormEvent } from 'react';
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
import { Textarea } from '../../../../components/ui/textarea/Textarea';
import { useDialog } from '../../../../hooks/useDialog';

import { useCreateCategory } from '../../../../hooks/data/useCategoriesMutations';
import { categoryCreateSchema } from '../../../../schemas/categoryCreate';
import { getDataForm } from '../../../../utils/getFormData';
import style from './Create.module.css';

export function CreateCategory({ onCreated }: { onCreated?: () => void }) {
  const createCategory = useCreateCategory();
  const { closeDialog } = useDialog();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = getDataForm({
      form: e.currentTarget,
      schema: categoryCreateSchema,
    });

    if (result.error) {
      toast.error('You must fill in all fields!');
      return;
    }

    createCategory.mutate(result.data, {
      onSuccess: () => toast.success('Category created successfully!'),
      onError: () => toast.error('Error creating category!'),
    });

    closeDialog();
    onCreated?.();
  };

  return (
    <DialogContent className={style.content}>
      <DialogHeader>
        <DialogTitle className={style.title}>New category</DialogTitle>
        <DialogClose />
      </DialogHeader>

      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.label}>
          <Label asterisk>Title</Label>
          <Input name='title' placeholder='Mario Kart 8' />
        </div>

        <Label className={style.label}>
          Description
          <Textarea
            className={style.textarea}
            name='description'
            placeholder='Amazing game'
          />
        </Label>
      </form>

      <DialogFooter>
        <Button>
          <p>Save category</p>
          <p>+</p>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
