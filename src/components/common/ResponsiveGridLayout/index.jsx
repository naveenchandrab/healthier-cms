import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'grid',
    alignItems: 'center'
  }
}));

const ResponsiveGridLayout = ({ children, minwidth, gridGap }) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minwidth}px, 1fr))`,
        gridGap
      }}
    >
      {children}
    </Box>
  );
};

ResponsiveGridLayout.propTypes = {
  children: PropTypes.node,
  minwidth: PropTypes.number,
  gridGap: PropTypes.number
};

ResponsiveGridLayout.defaultProps = {
  minwidth: 200,
  gridGap: 10
};

export default ResponsiveGridLayout;
