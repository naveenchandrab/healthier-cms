import React from 'react';
import { Snackbar as MuiSnackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  topRight: {
    top: 74
  },
  filledInfo: {
    backgroundColor: theme.palette.primary.main
  }
}));

const Snackbar = () => {
  const classes = useStyles();
  const {
    snackbar: { show, message, type }
  } = useSelector(state => state.common);

  const handleClose = () => {};

  return (
    <MuiSnackbar
      open={show}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      classes={{ anchorOriginTopRight: classes.topRight }}
    >
      <Alert
        elevation={6}
        classes={{ filledInfo: classes.filledInfo }}
        variant="filled"
        onClose={handleClose}
        severity={type}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
