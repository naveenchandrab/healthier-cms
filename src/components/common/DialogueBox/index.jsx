import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setDialogue } from '../../../containers/common.duck';

const DialogueBox = () => {
  const {
    dialogue: { open, title, description, cancelButtonText, onOk, okButtonText }
  } = useSelector(state => state.common);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(setDialogue({ open: false }));

  return (
    <Dialog open={open} onClose={handleClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {description && (
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        {cancelButtonText && (
          <Button onClick={handleClose} color="primary">
            {cancelButtonText}
          </Button>
        )}
        {okButtonText && (
          <Button
            onClick={() => {
              handleClose();
              onOk();
            }}
            color="primary"
            variant="contained"
          >
            {okButtonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogueBox;
