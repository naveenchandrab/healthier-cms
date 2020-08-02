/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('userToken');
  if (!token) return <Redirect to="/" />;
  return <Route {...rest} component={Component} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.node
};

export default PrivateRoute;
