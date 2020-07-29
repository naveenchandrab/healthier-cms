import { getPosts, getPost, postPost } from '../operations/posts';
import { GETPOSTS, GETPOST } from '../types/posts-types';

export const getPostsAction = () => {
  return dispatch => {
    getPosts()
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GETPOSTS, payload: json });
      });
  };
};

export const getPostAction = id => {
  return dispatch => {
    getPost(id)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GETPOST, payload: json });
      });
  };
};

export const createPostAction = post => {
  return () => {
    postPost(post)
      .then(response => response.json())
      .then(json => console.log(json));
  };
};
