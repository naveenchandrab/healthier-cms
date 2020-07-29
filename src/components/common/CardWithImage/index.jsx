import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {},
  bottomBar: {},
  image: {
    width: '100%',
    objectFit: 'cover',
    height: 200
  },
  bottomBarText: {
    textAlign: 'center',
    margin: '5px 0px'
  },
  card: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const CardWithImage = ({ onClick, imageUrl, bottomBarText }) => {
  const classes = useStyles();
  return (
    <Box onClick={onClick}>
      <Card className={classes.card}>
        <img className={classes.image} src={imageUrl} alt={imageUrl} />
        {bottomBarText && (
          <Typography className={classes.bottomBarText}>
            {bottomBarText}
          </Typography>
        )}
      </Card>
    </Box>
  );
};

CardWithImage.propTypes = {
  onClick: PropTypes.func,
  imageUrl: PropTypes.string,
  bottomBarText: PropTypes.string
};

CardWithImage.defaultProps = {
  onClick: () => {}
};

export default CardWithImage;
