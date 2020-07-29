// /* eslint-disable no-underscore-dangle */
// import React from 'react';
// import PropTypes from 'prop-types';
// import { Route, Redirect } from 'react-router-dom';
// import { useAuthContext } from '../contexts/authContext';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const { pathname } = rest.location;
//   const { user } = useAuthContext();
//   /** Check for token again in localStorage */
//   const token = localStorage.getItem('adminToken');
//   if (!token) return <Redirect to="/" />;
//   if (user && user._id) {
//     return <Route {...rest} component={Component} />;
//   }
//   return <Redirect to={`/auth/callback?token=${token}&redirect=${pathname}`} />;
// };

// PrivateRoute.propTypes = {
//   component: PropTypes.node
// };

// export default PrivateRoute;
