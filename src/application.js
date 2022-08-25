import * as yup from 'yup';
import i18next from 'i18next';
import makeWatchedState from './view.js';
import resources from './locales/index.js';

const elements = {
  form: document.querySelector('.rss-form '),
  input: document.querySelector('#url-input'),
  button: document.querySelector('[type="submit"]'),
  feedback: document.querySelector('.feedback'),
};

export default () => {
  const state = {
    formState: 'filling', // invalid, valid
    error: '',
    listOfValidUrl: [],
  };

  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  });

  const watchedState = makeWatchedState(state, elements, i18nInstance);

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const enteredUrl = formData.get('url').trim();
    const schema = yup.string().url().notOneOf(watchedState.listOfValidUrl);
    schema
      .validate(enteredUrl)
      .then((url) => {
        watchedState.listOfValidUrl.push(url);
        watchedState.error = '';
        watchedState.formState = 'valid';
      })
      .catch((error) => {
        watchedState.error = error;
        watchedState.formState = 'invalid';
      });
  });
};
