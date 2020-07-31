import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import CommonReducer from '../containers/common.duck';
import CardioReducer from '../containers/Exercises/Cardio/index.duck';

const rootReducer = combineReducers({
  common: CommonReducer,
  cardio: CardioReducer
});

const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

export default store;
