import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  span: {
    color: '#636363'
  },
  title: {
    fontSize: 18
  }
}));

const TextLabel = ({ value, label, linkText, link }) => {
  const classes = useStyles();

  return (
    <Box>
      <Box marginBottom={0.5}>
        <Typography
          className={classes.title}
          variant="h6"
          color="textSecondary"
        >
          {label}
        </Typography>
      </Box>
      {value && (
        <Typography
          variant="subtitle1"
          component="span"
          className={classes.span}
        >
          {value}
        </Typography>
      )}
      {link && (
        <Button size="small" href={link} color="secondary" target="_blank">
          {linkText}
        </Button>
      )}
    </Box>
  );
};

TextLabel.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  linkText: PropTypes.string,
  link: PropTypes.string
};

export default TextLabel;
