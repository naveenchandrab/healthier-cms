import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  withStyles,
  createStyles,
  CircularProgress,
  Fade
} from '@material-ui/core';

const styles = createStyles({
  root: {
    zIndex: 9999999999,
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8117647058823529)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerBox: {
    width: 90,
    height: 90,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%'
  }
});

const LoadingScreen = ({ classes }) => {
  return (
    <Fade in>
      <Box className={classes.root}>
        <CircularProgress size={50} />
        {/* <Box className={classes.innerBox}>
          <img
            className={classes.center}
            alt=""
            src=""
            style={{ maxWidth: 60 }}
          />
        </Box> */}
      </Box>
    </Fade>
  );
};

LoadingScreen.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(LoadingScreen);
