export default (status, elements, i18nInstance) => {
  if (status === 'correct') {
    elements.input.classList.remove('is-invalid');
    elements.feedback.classList.replace('text-danger', 'text-success');
    elements.feedback.textContent = i18nInstance.t('validRSS');
    elements.form.reset();
    elements.input.focus();
  } else if (status === 'incorrect') {
    elements.input.classList.add('is-invalid');
    elements.feedback.classList.replace('text-success', 'text-danger');
  }
};
