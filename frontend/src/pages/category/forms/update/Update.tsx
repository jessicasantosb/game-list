import { useState, type FormEvent } from 'react';
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
import { useUpdateCategory } from '../../../../hooks/data/useCategoriesMutations';
import { useDialog } from '../../../../hooks/useDialog';
import { categoryUpdateSchema } from '../../../../schemas/categoryUpdate';
import type { CategoryResponse } from '../../../../types/Category';
import { getDataForm } from '../../../../utils/getFormData';
import style from './Update.module.css';

type UpdateCategoryProps = {
  category: CategoryResponse;
  onCreated: () => void;
};

export function UpdateCategory({ category, onCreated }: UpdateCategoryProps) {
  const [categoryData, setCategoryData] = useState({
    title: category.title,
    description: category.description,
  });
  const updateCategory = useUpdateCategory();
  const { closeDialog } = useDialog();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = getDataForm({
      form: e.currentTarget,
      schema: categoryUpdateSchema,
    });

    if (result.error) {
      toast.error('You must fill in all fields!');
      return;
    }

    updateCategory.mutate(
      { ...result.data, id: category._id },
      {
        onSuccess: () => toast.success('Category updated successfully!'),
        onError: () => toast.error('Error updating category!'),
      },
    );

    closeDialog();
    onCreated?.();
  };

  return (
    <DialogContent className={style.content}>
      <DialogHeader>
        <DialogTitle className={style.title}>Edit category</DialogTitle>
        <DialogClose />
      </DialogHeader>

      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.label}>
          <Label asterisk>Title</Label>
          <Input
            name='title'
            value={categoryData.title}
            onChange={(e) =>
              setCategoryData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        <Label className={style.label}>
          Description
          <Textarea
            placeholder='Enter category description'
            name='description'
            value={categoryData.description}
            onChange={(e) =>
              setCategoryData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className={style.textarea}
          />
        </Label>
      </form>

      <DialogFooter>
        <Button>
          <p>Edit category</p>
          <p>+</p>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
