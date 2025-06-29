import style from './Label.module.css';

import type { LabelHTMLAttributes } from 'react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  asterisk?: boolean;
};

export function Label({ asterisk, children, ...props }: LabelProps) {
  return (
    <label className={style.label} {...props}>
      {children}
      {asterisk && <span className={style.asterisk}>*</span>}
    </label>
  );
}
