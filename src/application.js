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
  feeds: document.querySelector('.feeds'),
  posts: document.querySelector('.posts'),
};

export default () => {
  const state = {
    status: 'filling', // correct(succes, failure), incorrect
    error: null,
    enteredValue: null,
    links: [],
    feeds: [],
    posts: [],
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
    },
    string: {
      url: 'invalidURL',
    },
  });

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.status = 'filling';
    const formData = new FormData(e.target);
    watchedState.enteredValue = formData.get('url').trim();
    const schema = yup.string().url().notOneOf(watchedState.links);
    // const schema = yup.object({
    //   url: yup.string().required().url().notOneOf(watchedState.links),
    // });
    schema
      .validate(watchedState.enteredValue)
      .then((url) => {
        watchedState.links.push(url);
        watchedState.error = null;
        watchedState.status = 'correct';
        loader(watchedState);
      })
      .catch((error) => {
        watchedState.error = i18nInstance.t(`errors.${error.message}`);
        watchedState.status = 'incorrect';
        console.log(error.message);
      });
  });
};
