import orderListIcon from '../../../assets/orderList.svg';

import { useState } from 'react';
import styles from './HeaderList.module.css';
import { orderListDown, orderListUp } from '../../../utils/icons';

type Header = {
  sort: string;
  label: string;
};

type HeaderListProps = {
  fields: Header[];
  onSortClick: (sort: string, direction: 'asc' | 'desc') => void; // agora com direção!
};

const HeaderList = ({ fields, onSortClick }: HeaderListProps) => {
  const [sortState, setSortState] = useState<{
    field: string;
    direction: 'asc' | 'desc';
  }>({
    field: '',
    direction: 'asc',
  });

  const handleSortClick = (field: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortState.field === field) {
      direction = sortState.direction === 'asc' ? 'desc' : 'asc';
    }
    setSortState({ field, direction });
    onSortClick(field, direction); // <== aqui voltamos a enviar o campo como antes
  };

  return (
    <div className={styles.headerRow}>
      <div className={styles.imageSpace} />

      {fields.map(({ sort, label }, index) => (
        <div
          key={index}
          className={styles.headerItem}
          onClick={() => handleSortClick(sort)}>
          {label}
          <img
            src={
              sortState.field === sort
                ? sortState.direction === 'asc'
                  ? orderListUp
                  : orderListDown
                : orderListIcon
            }
            alt='Sort Icon'
            className={styles.sortIcon}
          />
        </div>
      ))}

      <div className={styles.iconsSpace} />
    </div>
  );
};

export default HeaderList;
