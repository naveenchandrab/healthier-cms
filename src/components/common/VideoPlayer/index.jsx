import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Player from './Player';

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
    backgroundColor: 'rgba(1, 1, 1, 0.8)',
    opacity: 0,
    pointerEvents: 'none',
    zIndex: 99999,
    transition: 'opacity 200ms ease-in-out'
  },
  open: {
    opacity: 1,
    pointerEvents: 'all'
  },
  overlay: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});

const VideoPlayer = ({ url, open, width, onClose }) => {
  const classes = useStyles();
  return (
    <Box className={`${classes.root} ${open && classes.open}`}>
      <Box className={classes.overlay} onClick={onClose} />
      <Box>
        <Player src={url} width={width} />
      </Box>
    </Box>
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string,
  width: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default VideoPlayer;
