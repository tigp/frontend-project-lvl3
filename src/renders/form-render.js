export default (state, elements, i18nInstance) => {
  if (state.status === 'correct') {
    elements.input.classList.remove('is-invalid');
    elements.feedback.classList.replace('text-danger', 'text-success');
    elements.feedback.textContent = i18nInstance.t('validRSS');
    elements.form.reset();
    elements.input.focus();
  } else if (state.status === 'incorrect') {
    elements.input.classList.add('is-invalid');
    elements.feedback.classList.replace('text-success', 'text-danger');
    elements.feedback.textContent = state.error;
  }
};
