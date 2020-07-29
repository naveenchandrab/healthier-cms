import React from 'react';
import { Snackbar as MuiSnackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
// import { AppContext } from '../../../contexts/AppContext';

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
  // const { snackbar, setSnackbar } = useContext(AppContext);

  const handleClose = () => {};

  return (
    <MuiSnackbar
      // open={snackbar.show}
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
        // severity={snackbar.type}
      >
        {/* {snackbar.message} */}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
