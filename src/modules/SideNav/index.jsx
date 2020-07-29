import React from 'react';
import {
  Drawer,
  IconButton,
  ListItem,
  Divider,
  List,
  ListItemText,
  useTheme,
  Typography,
  Box
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between'
  },
  listItem: {
    color: theme.palette.white
  },
  activeListItem: {
    textDecoration: 'none',
    '& .MuiButtonBase-root': {
      backgroundColor: theme.palette.primary.dark
    }
  }
}));

const routes = [
  {
    id: 1,
    name: 'Cardio'
  },
  {
    id: 2,
    name: 'Gymnastic'
  },
  {
    id: 3,
    name: 'Yoga'
  }
];

const SideNav = ({ open, onDrawerClose }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      color="primary"
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <Box color={theme.palette.white} marginLeft={1}>
          <Typography variant="h5">Healthier</Typography>
        </Box>
        <IconButton
          style={{ color: theme.palette.white }}
          onClick={onDrawerClose}
        >
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {routes.map(route => (
          <NavLink
            style={{ textDecoration: 'none' }}
            key={route.id}
            activeClassName={classes.activeListItem}
            to={`/dashboard/${route.name.replace(/\s/g, '')}`}
          >
            <ListItem className={`${classes.listItem}`} button key={route.id}>
              <ListItemText primary={route.name} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
};

SideNav.propTypes = {
  open: PropTypes.bool,
  onDrawerClose: PropTypes.func,
  setCurrentTab: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object
};

export default SideNav;
