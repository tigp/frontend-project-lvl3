import axios from 'axios';
import _, { uniqueId } from 'lodash';
import parser from './parser.js';

// const createUniquePosts = (watchedState, posts) => {
//   if (watchedState.posts.length === 0) {
//     watchedState.posts.push(posts.flat());
//     return;
//   }

//   watchedState.posts.concat(posts.flat());
//   const uniqPosts = _.uniqBy(watchedState.posts, 'title');
//   watchedState.posts = uniqPosts;
//   // console.log(uniqPosts);
// };

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
      const { feed, posts } = parser(responce);
      watchedState.status = 'success';
      feed.url = url;
      feed.id = uniqueId();
      watchedState.feeds.push(feed);
      watchedState.posts.push(posts);
      //createUniquePosts(watchedState, posts);
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
  const promises = watchedState.feeds.map(({ url }) => {
    const proxiedURL = getProxiedURL(url);
    return axios.get(proxiedURL);
  });
  Promise
    .all(promises)
    .then((responces) => {
      responces.forEach((responce) => {
        const { posts } = parser(responce);
        const currentPosts = watchedState.posts.flat().map((post) => post.link);
        const uniqPosts = posts.filter((post) => !currentPosts.includes(post.link));
        watchedState.posts = uniqPosts.concat(watchedState.posts);
      });
    })
    .finally(() => setTimeout(() => updatingPosts(watchedState), periodOfUpdating));
};

export { loadingPosts, updatingPosts };
