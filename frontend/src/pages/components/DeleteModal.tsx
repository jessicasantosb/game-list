import React from 'react';
import { Button } from '../../components/ui/button/Button';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog/Dialog';
import { useDialog } from '../../hooks/useDialog';
import { warning } from '../../utils/icons';
import styles from './DeleteModal.module.css';

type DeleteType = 'platform' | 'category' | 'game';

interface DeleteModalProps {
  type: DeleteType;
  onDelete: () => void;
}

const getDeleteMessage = (type: DeleteType): string => {
  switch (type) {
    case 'platform':
      return 'Deleting this platform will remove it permanently from the system. This action is not reversible.';
    case 'category':
      return 'Deleting this category will remove all games associated. This action is not reversible.';
    case 'game':
      return 'Deleting this game will remove it permanently from the system. This action is not reversible.';
    default:
      return '';
  }
};

const DeleteModal: React.FC<DeleteModalProps> = ({ type, onDelete }) => {
  const { closeDialog } = useDialog();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogClose />
        <div className={styles.headerWrapper}>
          <DialogTitle className={styles.title}>Are you sure?</DialogTitle>
          <img src={warning} alt='Warning' />
        </div>
      </DialogHeader>

      <p className={styles.message}>{getDeleteMessage(type)}</p>

      <DialogFooter className={styles.actions}>
        <Button onClick={closeDialog}>No, cancel action</Button>
        <Button onClick={() => onDelete()}>{`Yes, delete this ${type}`}</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteModal;
