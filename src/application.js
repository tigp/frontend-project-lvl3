import * as yup from 'yup';
import makeWatchedState from './view.js';

const elements = {
  form: document.querySelector('.rss-form '),
  input: document.querySelector('#url-input'),
  button: document.querySelector('[type="submit"]'),
  feedback: document.querySelector('.feedback'),
};

export default () => {
  const state = {
    formState: 'filling',
    error: '',
    listOfValidUrl: [],
  };

  const watchedState = makeWatchedState(state, elements);

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const enteredUrl = formData.get('url');
    // listOfUrl = watchedState.listOfValidUrl.map((url) => url);
    const schema = yup.string().required().url(); // .notOneOf(watchedState.listOfValidUrl)
    schema
      .validate(enteredUrl)
      .then((url) => {
        watchedState.listOfValidUrl.push(url);
        watchedState.error = '';
        elements.form.reset();
        elements.form.focus();
      })
      .catch((error) => {
        watchedState.error = error;
      });
  });
};
