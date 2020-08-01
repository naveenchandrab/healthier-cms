import { removeSearchParams } from '../common';

const Axios = require('axios');

export const getExerciseCategories = () =>
  new Promise((resolve, reject) => {
    Axios.get('/exerciseCategories')
      .then(({ data }) => resolve(data))
      .catch(error => reject(error));
  });

export const getExercises = () =>
  new Promise((resolve, reject) => {
    Axios.get('/exercises')
      .then(({ data }) => resolve(data))
      .catch(error => reject(error));
  });

export const getExercise = id =>
  new Promise((resolve, reject) => {
    Axios.get(`/exercises/${id}`)
      .then(({ data }) => resolve(data))
      .catch(error => reject(error));
  });

export const postExercise = data =>
  new Promise((resolve, reject) => {
    Axios.post('/exercises', data)
      .then(({ data }) => resolve(data))
      .catch(error => reject(error));
  });

export const deleteExercise = id =>
  new Promise((resolve, reject) => {
    Axios.delete(`/exercises/${id}`)
      .then(({ data }) => resolve(data))
      .catch(error => reject(error));
  });

export const updateExercise = (id, data) =>
  new Promise((resolve, reject) => {
    Axios.put(`/exercises/${id}`, data)
      .then(({ data }) => resolve(data))
      .catch(error => reject(error));
  });

export const getSignedUrl = data =>
  new Promise((resolve, reject) => {
    Axios.post('/upload', data)
      .then(({ data }) => resolve(data))
      .catch(error => reject(error));
  });

export const uploadFileToSignedUrl = (
  signedUrl,
  file,
  onProgress = () => {},
  ContentType = 'application/octet-stream'
) =>
  new Promise((resolve, reject) => {
    Axios.put(signedUrl, file, {
      onUploadProgress: onProgress,
      headers: {
        'Content-Type': ContentType
      }
    })
      .then(() => resolve(removeSearchParams(signedUrl)))
      .catch(error => reject(error));
  });
