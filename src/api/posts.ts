import { BASE_URL } from './api';

export const getData = (query: string) => {
  return fetch(`${BASE_URL}/${query}`)
    .then(response => response.json());
};

export const getPostDetails = (postId: number) => {
  return getData(`posts/:${postId}`);
};
