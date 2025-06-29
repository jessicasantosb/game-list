import React from 'react';

import style from './Table.module.css';
import { cn } from '../../../utils/cn';
import {
  eye,
  eyeClosed,
  imageController,
  pen,
  penBlack,
  star,
  starFilled,
  trash,
  trashBlack,
  orderListIcon
} from '../../../utils/icons';
import { Button } from '../button/Button';

type TableProps = React.ComponentProps<'table'>;

function Table({ ...props }: TableProps) {
  return (
    <div className={style.container}>
      <table className={style.table} {...props} />
    </div>
  );
}

type TableCaptionProps = React.ComponentProps<'caption'>;

function TableCaption({ ...props }: TableCaptionProps) {
  return <caption {...props} />;
}

type TableHeaderProps = React.ComponentProps<'thead'>;

function TableHeader({ ...props }: TableHeaderProps) {
  return <thead {...props} />;
}

type TableBodyProps = React.ComponentProps<'tbody'>;

function TableBody({ ...props }: TableBodyProps) {
  return <tbody className={style.body} {...props} />;
}

type TableFooterProps = React.ComponentProps<'tfoot'>;

function TableFooter({ ...props }: TableFooterProps) {
  return <tfoot {...props} />;
}

type TableHeadProps = React.ComponentProps<'th'>;

function TableHead({ children, ...props }: TableHeadProps) {
  return (
    <th {...props}>
      <div className={style.head}>
        {children}
        <img src={orderListIcon} alt='Order List' />
      </div>
    </th>
  );
}

type TableHeadFakeProps = React.ComponentProps<'th'>;

function TableHeadFake({ ...props }: TableHeadFakeProps) {
  return <th {...props} />;
}

type TableRowProps = React.ComponentProps<'tr'>;

function TableRow({ ...props }: TableRowProps) {
  return <tr className={style.row} {...props} />;
}

type TableCellProps = React.ComponentProps<'td'>;

function TableCell({ ...props }: TableCellProps) {
  return <td className={style.cell} {...props} />;
}

type TableImageProps = React.ComponentProps<'img'>;

function TableImage({ className, src, ...props }: TableImageProps) {
  return (
    <div className={style.image_wrapper}>
      <img
        src={imageController}
        className={cn(style.image, className)}
        alt='Card Icon'
        {...props}
      />
    </div>
  );
}

type TableStarButtonProps = React.ComponentProps<typeof Button> & {
  isFavorite?: boolean;
};

function TableStarButton({
  className,
  isFavorite,
  ...props
}: TableStarButtonProps) {
  return (
    <Button
      variant='white'
      size='icon'
      className={cn(style.star, className)}
      {...props}>
      <img
        src={isFavorite ? starFilled : star}
        alt={isFavorite ? 'Star Filled' : 'Star'}
      />
    </Button>
  );
}

type FormType = 'view' | 'edit' | 'delete';
type ObjectIcons = Record<FormType, string>;
type TableButtonProps = React.ComponentProps<typeof Button> & {
  formType: FormType;
};

function TableButton({ formType, ...props }: TableButtonProps) {
  const [hoveredIcon, setHoveredIcon] = React.useState<FormType | null>(null);

  const IconsHovered: ObjectIcons = {
    view: eye,
    edit: pen,
    delete: trash,
  };

  const IconsNotHovered: ObjectIcons = {
    view: eyeClosed,
    edit: penBlack,
    delete: trashBlack,
  };

  return (
    <Button
      variant='white'
      size='icon'
      onMouseEnter={() => setHoveredIcon(formType)}
      onMouseLeave={() => setHoveredIcon(null)}
      {...props}>
      <img
        src={
          hoveredIcon === formType
            ? IconsHovered[formType]
            : IconsNotHovered[formType]
        }
        alt={formType}
      />
    </Button>
  );
}

export {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableHeadFake,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
  TableImage,
  TableStarButton,
  TableButton,
};
