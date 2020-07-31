import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(1, 1, 1, 0.8)'
  }
});

const VideoPlayer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box>video</Box>
    </Box>
  );
};

export default VideoPlayer;
