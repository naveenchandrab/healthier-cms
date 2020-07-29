export const URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = () => fetch(`${URL}/posts`);

export const getPost = id => fetch(`${URL}/posts/${id}`);

export const postPost = post => {
  return fetch(`${URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });
};
