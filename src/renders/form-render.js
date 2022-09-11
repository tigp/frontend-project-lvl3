export default (status, elements, i18nInstance) => {
  switch (status) {
    case 'loading':
      elements.button.disabled = true;
      elements.feedback.classList.replace('text-danger', 'text-success');
      elements.feedback.textContent = i18nInstance.t('loading');
      elements.feedback.style.color = 'orange'; // why i can't do this?
      break;
    case 'added':
      elements.button.disabled = false;
      elements.input.classList.remove('is-invalid');
      elements.feedback.classList.replace('text-danger', 'text-success');
      elements.feedback.textContent = i18nInstance.t('validRSS');
      elements.form.reset();
      elements.input.focus();
      break;
    case 'error':
      elements.button.disabled = false;
      elements.input.classList.add('is-invalid');
      elements.feedback.classList.replace('text-success', 'text-danger');
      break;
    default:
      elements.button.disabled = false;
      break;
  }
};
