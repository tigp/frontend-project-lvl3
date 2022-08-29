import * as yup from 'yup';
import i18next from 'i18next';
import createWatchedState from './view.js';
import resources from './locales/index.js';
import loader from './loader.js';

const elements = {
  form: document.querySelector('.rss-form '),
  input: document.querySelector('#url-input'),
  button: document.querySelector('[type="submit"]'),
  feedback: document.querySelector('.feedback'),
  posts: document.querySelector('.posts'),
  feeds: document.querySelector('.feeds'),
};

export default () => {
  const state = {
    status: 'filling', // correct(succes, failure), incorrect
    error: null,
    links: null,
    posts: [],
  };

  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  });

  const watchedState = createWatchedState(state, elements, i18nInstance);

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.status = 'filling';
    const formData = new FormData(e.target);
    const enteredUrl = formData.get('url').trim();
    const schema = yup.string().url(); // .notOneOf(watchedState.links)
    schema
      .validate(enteredUrl)
      .then((url) => {
        watchedState.links = url;
        watchedState.error = null;
        watchedState.status = 'correct';
        loader(watchedState);
      })
      .catch((error) => {
        watchedState.error = error;
        watchedState.status = 'incorrect';
      });
  });
};
