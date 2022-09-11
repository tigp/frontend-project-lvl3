import _ from 'lodash';

export default (watchedState, elements, i18nInstance) => {
  elements.posts.textContent = '';
  const mainDiv = document.createElement('div');
  const divForH2 = document.createElement('div');
  const h2 = document.createElement('h2');
  const ul = document.createElement('ul');

  mainDiv.classList.add('card', 'border-0');
  divForH2.classList.add('card-body');
  h2.classList.add('card-title', 'h4');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  h2.textContent = i18nInstance.t('posts');

  elements.posts.append(mainDiv);
  mainDiv.append(divForH2, ul);
  divForH2.append(h2);

  const sortedPosts = _.reverse(_.sortBy(watchedState.posts.flat(), (p) => Date.parse(p.pubDate)));

  sortedPosts.forEach((post) => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    const button = document.createElement('button');

    link.setAttribute('href', post.link);
    link.setAttribute('data-id', `${post.id}`);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    button.setAttribute('type', 'button');
    button.setAttribute('data-id', `${post.id}`);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');

    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    if (watchedState.uiState.viewedPostsId.has(post.id)) {
      link.classList.add('fw-normal', 'link-secondary');
    } else {
      link.classList.add('fm-bold');
    }

    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');

    link.textContent = post.title;
    button.textContent = i18nInstance.t('button');

    ul.append(li);
    li.append(link, button);

    li.addEventListener('click', () => {
      watchedState.uiState.viewedPostsId.add(post.id);
      watchedState.uiState.targetPostId = post.id;
    });
  });
};
