import { GETPOSTS } from '../types/posts-types';

export default (state = {}, action) => {
  switch (action.type) {
    case GETPOSTS:
      return action.payload;
    default:
      return state;
  }
};
