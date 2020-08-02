import Axios from 'axios';

export const userLogin = data =>
  new Promise((resolve, reject) => {
    Axios.post('/auth', data)
      .then(({ data }) => resolve(data))
      .catch(error => reject(error));
  });
