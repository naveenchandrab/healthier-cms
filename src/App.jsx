/* eslint-disable no-useless-catch */
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import Root from './modules/Root';
import theme from './utils/theme';
import Login from './modules/Login';
import LoadingScreen from './components/common/LoadingScreen';

const BASE_URL = process.env.REACT_APP_BASE_URL;

Axios.defaults.baseURL = BASE_URL;

const App = () => {
  const { loading } = useSelector(state => state.common);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        {loading && <LoadingScreen />}
        <Switch>
          <Route path="/dashboard" component={Root} />
          <Route path="/" component={Login} />
          <Route path="*" component={Login} />
        </Switch>
      </div>
    </ThemeProvider>
  );
};

App.propTypes = {
  posts: PropTypes.array,
  getPost: PropTypes.func,
  createPost: PropTypes.func,
  getAllPosts: PropTypes.func
};

export default App;
