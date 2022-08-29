import axios from 'axios';
import parser from './parser.js';

const getProxiedURL = (url) => {
  const proxiedURL = new URL('https://allorigins.hexlet.app/get');
  proxiedURL.searchParams.set('disableCache', true);
  proxiedURL.searchParams.set('url', url);
  return proxiedURL;
};

export default (watchedState) => {
  const url = watchedState.links;
  const proxiedURL = getProxiedURL(url);

  axios
    .get(proxiedURL)
    .then((responce) => {
      watchedState.status = 'success';
      watchedState.posts.push(parser(responce));
      console.log(watchedState.status);
    })
    .catch((error) => {
      watchedState.status = 'failure';
      watchedState.error = error;
      console.log(watchedState.error);
    });
};
