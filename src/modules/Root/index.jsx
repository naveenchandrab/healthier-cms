import React, { useState } from 'react';
import { Switch } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SideNav from '../SideNav';
import Topbar from '../Topbar';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: theme.spacing(11),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

const Root = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Topbar open={open} onDrawerOpen={handleDrawerOpen} />
      <SideNav open={open} onDrawerClose={handleDrawerClose} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <Switch>
          {/* <PrivateRoute
            exact
            path="/dashboard/NewProjects/:id/request/:requestId/quotation"
            component={Quotation}
          />
          <PrivateRoute
            exact
            path="/dashboard/NewProjects/:id/request/:requestId/invoice"
            component={Invoice}
          />
          <PrivateRoute
            exact
            path="/dashboard/NewProjects/:id/request/:requestId/requirements"
            component={Requirements}
          />
          <PrivateRoute
            exact
            path="/dashboard/NewProjects/:id/request/:requestId"
            component={Requests}
          />
          <PrivateRoute
            exact
            path="/dashboard/NewProjects"
            component={Projects}
          /> */}
        </Switch>
      </main>
    </div>
  );
};

export default Root;
