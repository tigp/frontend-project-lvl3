import onChange from 'on-change';

const errorRender = (error, elements) => {
  if (error === '') {
    elements.input.classList.remove('is-invalid');
    elements.feedback.classList.replace('text-danger', 'text-success');
    elements.feedback.textContent = 'RSS успешно загружен';
  }

  elements.input.classList.add('is-invalid');
  elements.feedback.classList.replace('text-success', 'text-danger');
  elements.feedback.textContent = 'Ссылка должна быть валидным URL';
};

export default (state, elements) => onChange(state, (path, value) => {
  switch (path) {
    case 'fromState':
      break;
    case 'error':
      errorRender(value, elements);
      break;
    case 'listOfValidUrl':
      break;
    default:
      break;
  }
});
