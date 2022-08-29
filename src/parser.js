const getFeeds = (document) => {
  const title = document.querySelector('title').textContent;
  const description = document.querySelector('description').textContent;

  return { title, description };
};

const getPosts = (document) => {
  const items = document.querySelectorAll('item');
  const posts = [];

  items.forEach((item) => {
    const post = {
      title: item.querySelector('title').textContent,
      link: item.querySelector('link').textContent,
      description: item.querySelector('description').textContent,
    };
    posts.push(post);
  });

  return posts;
};

export default (responce) => {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(responce.data.contents, 'application/xml');
  const error = parsedDocument.querySelector('parseererror');

  if (error) {
    // watchedState.error = error;
    throw new Error();
  }

  return {
    feeds: getFeeds(parsedDocument),
    posts: getPosts(parsedDocument),
  };
};
// const posts = {
//   feeds: { title, description },
//   posts: [post: {
//     title,
//     link,
//     description,
//   }, post...],
// };
