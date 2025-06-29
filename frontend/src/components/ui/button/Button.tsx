import style from './Button.module.css';
import { cn } from '../../../utils/cn';
import { Slot } from '../slot/Slot';

import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'white' | 'turquoise' | 'gray';
  size?: 'icon';
  asChild?: boolean;
};

export function Button({
  variant = 'turquoise',
  size,
  asChild,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  const combinedClassName = cn(
    style.button,
    style[`variant-${variant}`],
    style[`size-${size}`],
    className,
  );

  return <Comp type={type} className={combinedClassName} {...props} />;
}