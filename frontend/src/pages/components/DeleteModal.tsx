import React from 'react';

import styles from './DeleteModal.module.css';
import { Button } from '../../components/ui/button/Button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog/Dialog';
import { useDialog } from '../../hooks/useDialog';
import { warning } from '../../utils/icons';

type DeleteType = 'platform' | 'category' | 'game';

interface DeleteModalProps {
  type: DeleteType;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ type, onDelete }) => {
  const { closeDialog } = useDialog();

  const description = {
    platform:
      'Deleting this platform will remove it permanently from the system. This action is not reversible.',
    category:
      'Deleting this category will remove all games associated. This action is not reversible.',
    game: 'Deleting this game will remove it permanently from the system. This action is not reversible.',
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogClose />
        <div className={styles.headerWrapper}>
          <DialogTitle className={styles.title}>Are you sure?</DialogTitle>
          <img src={warning} alt='Warning' />
        </div>
      </DialogHeader>
      <DialogDescription>{description[type]}</DialogDescription>
      <DialogFooter className={styles.actions}>
        <Button onClick={closeDialog}>No, cancel action</Button>
        <Button onClick={() => onDelete()}>{`Yes, delete this ${type}`}</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteModal;
