/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import postReducer from './reducers/post-reducer';

const rootReducer = combineReducers({
  // posts: postReducer
});

const initialState = {
  posts: []
};

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(rootReducer, initialState, allStoreEnhancers);

export default store;
