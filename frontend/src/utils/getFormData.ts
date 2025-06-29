import { Schema } from 'zod';

type GetDataForm<T> = {
  form: EventTarget & HTMLFormElement;
  schema: Schema<T>;
};

export const getDataForm = <T>({ form, schema }: GetDataForm<T>) => {
  const formData = new FormData(form);
  const data: Record<string, unknown> = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value || undefined;
  }

  const result = schema.safeParse(data);

  return result;
};
