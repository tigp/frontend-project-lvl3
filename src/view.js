import onChange from 'on-change';

const render = (formState, elements, i18nInstance) => {
  if (formState === 'valid') {
    elements.input.classList.remove('is-invalid');
    elements.feedback.classList.replace('text-danger', 'text-success');
    elements.feedback.textContent = i18nInstance.t('validRSS');
    elements.form.reset();
    elements.input.focus();
  } else if (formState === 'invalid') {
    elements.input.classList.add('is-invalid');
    elements.feedback.classList.replace('text-success', 'text-danger');
    elements.feedback.textContent = i18nInstance.t('errors.invalidURL');
  }
};

export default (state, elements, i18nInstance) => onChange(state, (path, value) => {
  switch (path) {
    case 'formState':
      render(value, elements, i18nInstance);
      break;
    case 'error':
      break;
    case 'listOfValidUrl':
      break;
    default:
      break;
  }
});
