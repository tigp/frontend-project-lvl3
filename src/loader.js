import axios from 'axios';
import parser from './parser.js';

const getProxiedURL = (url) => {
  const proxiedURL = new URL('https://allorigins.hexlet.app/get');
  proxiedURL.searchParams.set('disableCache', true);
  proxiedURL.searchParams.set('url', url);
  return proxiedURL;
};

export default (watchedState) => {
  const proxiedURL = getProxiedURL(watchedState.enteredValue);
  axios
    .get(proxiedURL)
    .then((responce) => {
      const { feeds, posts } = parser(responce);
      watchedState.status = 'success';
      watchedState.feeds.push(feeds);
      watchedState.posts.push(posts);
    })
    .catch((error) => {
      watchedState.status = 'failure';
      watchedState.error = error;
    });
};
