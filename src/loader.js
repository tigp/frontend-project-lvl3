import axios from 'axios';
import _ from 'lodash';
import parser from './parser.js';

const getProxiedURL = (url) => {
  const proxiedURL = new URL('https://allorigins.hexlet.app/get');
  proxiedURL.searchParams.set('disableCache', true);
  proxiedURL.searchParams.set('url', url);
  return proxiedURL;
};

const loadingPosts = (url, watchedState) => {
  const proxiedURL = getProxiedURL(url);
  axios
    .get(proxiedURL)
    .then((responce) => {
      const { feeds, posts } = parser(responce);
      watchedState.status = 'success';
      watchedState.feeds.push(feeds);
      watchedState.posts.push(posts);

      watchedState.feeds.url = url; // should will be use this instead of watchedState.links
      watchedState.feeds.id = _.uniqueId(); // create id indificator
      // watchedState.posts.forEach((post) => post.id = watchedState.feeds.id);
    })
    .catch((error) => {
      if (error.isParsingError) {
        watchedState.error = 'parsingError';
      } else {
        watchedState.error = 'unknow';
      }
      watchedState.status = 'incorrect';
    });
};

const updatingPosts = (watchedState) => {
  const periodOfUpdating = 5000;

  const promises = watchedState.links.map((link) => {
    const proxiedURL = getProxiedURL(link);
    return axios.get(proxiedURL);
  });

  Promise
    .all(promises)
    .then((responces) => {
      responces.forEach((responce) => {
        const { posts } = parser(responce);
        watchedState.posts = posts.flat();
      });
    })
    .finally(() => setTimeout(() => updatingPosts(watchedState), periodOfUpdating));
};

export { loadingPosts, updatingPosts };
