import style from './Button.module.css';

import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'white' | 'turquoise' | 'gray';
};

export function Button({ variant = 'turquoise', ...props }: ButtonProps) {
  return <button className={`${style[variant]} ${style.button}`} {...props} />;
}
