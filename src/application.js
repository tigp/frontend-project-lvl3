import * as yup from 'yup';
import i18next from 'i18next';
import createWatchedState from './view.js';
import resources from './locales/index.js';
import { loadingPosts, updatingPosts } from './loader.js';

export default () => {
  const elements = {
    form: document.querySelector('.rss-form '),
    input: document.querySelector('#url-input'),
    button: document.querySelector('[type="submit"]'),
    feedback: document.querySelector('.feedback'),
    feeds: document.querySelector('.feeds'),
    posts: document.querySelector('.posts'),
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    modalLink: document.querySelector('.full-article'),
  };

  const state = {
    formState: {
      status: 'filling',
      error: null,
    },
    feeds: [],
    posts: [],
    uiState: {
      viewedPostsId: new Set(),
      targetPostId: null,
    },
  };

  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  });

  const watchedState = createWatchedState(state, elements, i18nInstance);

  yup.setLocale({
    mixed: {
      notOneOf: 'notOneOf',
      required: 'required',
    },
    string: {
      url: 'invalidURL',
    },
  });

  const isValidValue = (value, previousEnteredLinks) => {
    const links = previousEnteredLinks.map(({ url }) => url);
    const schema = yup.string().required().url().notOneOf(links);
    return schema.validate(value);
  };

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.formState.status = 'filling';
    const formData = new FormData(e.target);
    const enteredValue = formData.get('url').trim();
    isValidValue(enteredValue, watchedState.feeds)
      .then((url) => {
        watchedState.formState.status = 'loading';
        watchedState.formState.error = null;
        loadingPosts(url, watchedState);
      })
      .catch((error) => {
        watchedState.formState.status = 'error';
        watchedState.formState.error = error.message;
      });
  });

  updatingPosts(watchedState);
};
