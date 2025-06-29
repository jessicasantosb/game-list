import style from './Textarea.module.css';

import type { TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ ...props }: TextareaProps) {
  return <textarea className={style.textarea} {...props} />;
}
