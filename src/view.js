import onChange from 'on-change';
import formRender from './renders/form-render.js';
import errorRender from './renders/error-render.js';
import feedsRender from './renders/feeds-render.js';
import postsRender from './renders/posts-render.js';
import modalRender from './renders/modal-render.js';

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
