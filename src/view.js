import onChange from 'on-change';
import _ from 'lodash';

const formRender = (status, elements, i18nInstance) => {
  switch (status) {
    case 'loading':
      elements.button.disabled = true;
      elements.feedback.classList.replace('text-danger', 'text-success');
      elements.feedback.textContent = i18nInstance.t('loading');
      elements.feedback.style.color = 'orange';
      break;
    case 'added':
      elements.button.disabled = false;
      elements.input.classList.remove('is-invalid');
      elements.feedback.classList.replace('text-danger', 'text-success');
      elements.feedback.textContent = i18nInstance.t('validRSS');
      elements.form.reset();
      elements.input.focus();
      break;
    case 'error':
      elements.button.disabled = false;
      elements.input.classList.add('is-invalid');
      elements.feedback.classList.replace('text-success', 'text-danger');
      break;
    default:
      elements.button.disabled = false;
      break;
  }
};

const errorRender = (error, elements, i18nInstance) => {
  if (error === null) {
    return;
  }

  elements.feedback.textContent = i18nInstance.t(`errors.${error}`);
};

const feedsRender = (feeds, elements, i18nInstance) => {
  elements.feeds.textContent = '';
  const mainDiv = document.createElement('div');
  const divForH2 = document.createElement('div');
  const h2 = document.createElement('h2');
  const ul = document.createElement('ul');

  mainDiv.classList.add('card', 'border-0');
  divForH2.classList.add('card-body');
  h2.classList.add('card-title', 'h4');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  h2.textContent = i18nInstance.t('feeds');

  elements.feeds.append(mainDiv);
  mainDiv.append(divForH2, ul);
  divForH2.append(h2);

  feeds.forEach(({ title, description }) => {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');

    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    h3.classList.add('h6', 'm-0');
    p.classList.add('m-0', 'small', 'text-black-50');

    h3.textContent = title;
    p.textContent = description;

    ul.append(li);
    li.append(h3, p);
  });
};

const postsRender = (watchedState, elements, i18nInstance) => {
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
      link.classList.add('fw-bold');
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

const modalRender = (watchedState, elements) => {
  const targetPost = watchedState.posts
    .flat()
    .find((post) => post.id === watchedState.uiState.targetPostId);

  elements.modalTitle.textContent = targetPost.title;
  elements.modalBody.textContent = targetPost.description;
  elements.modalLink.setAttribute('href', targetPost.link);
};

export default (state, elements, i18nInstance) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'formState.status':
        formRender(value, elements, i18nInstance);
        break;
      case 'formState.error':
        errorRender(value, elements, i18nInstance);
        break;
      case 'feeds':
        feedsRender(value, elements, i18nInstance);
        break;
      case 'posts':
        postsRender(watchedState, elements, i18nInstance);
        break;
      case 'uiState.targetPostId':
        modalRender(watchedState, elements);
        break;
      default:
        break;
    }
  });

  return watchedState;
};
