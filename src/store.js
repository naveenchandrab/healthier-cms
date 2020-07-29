import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import postReducer from './reducers/post-reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  posts: postReducer,
})

const initialState = {
  posts: [],
}

const allStoreEnhancers = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const store = createStore(rootReducer, initialState, allStoreEnhancers);

export default store;
