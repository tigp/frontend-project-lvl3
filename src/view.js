import onChange from 'on-change';
import formRender from './renders/form-render.js';
import errorRender from './renders/error-render.js';
import feedsRender from './renders/feeds-render.js';
import postsRender from './renders/posts-render.js';

export default (state, elements, i18nInstance) => onChange(state, (path, value) => {
  switch (path) {
    case 'status':
      formRender(value, elements, i18nInstance);
      break;
    case 'error':
      errorRender(value, elements, i18nInstance);
      break;
    case 'feeds':
      feedsRender(value, elements, i18nInstance);
      break;
    case 'posts':
      postsRender(value, elements, i18nInstance);
      break;
    default:
      break;
  }
});
