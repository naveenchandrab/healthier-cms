/* eslint-disable no-useless-catch */
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import Root from './modules/Root';
import theme from './utils/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Root />
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
