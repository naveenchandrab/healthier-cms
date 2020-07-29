import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles(() => ({
  backButton: {
    color: '#AFAFAF',
    textTransform: 'capitalize',
    backgroundColor: 'transparent'
  }
}));

const BackButton = ({ onClick, label }) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.backButton}
      style={{ backgroundColor: 'transparent' }}
      startIcon={<ArrowBackIosIcon />}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

BackButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};

BackButton.defaultProps = {
  onClick: () => {}
};

export default BackButton;
