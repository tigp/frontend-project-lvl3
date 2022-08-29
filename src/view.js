import onChange from 'on-change';

const formRender = (formState, elements, i18nInstance) => {
  if (formState === 'correct') {
    elements.input.classList.remove('is-invalid');
    elements.feedback.classList.replace('text-danger', 'text-success');
    elements.feedback.textContent = i18nInstance.t('validRSS');
    elements.form.reset();
    elements.input.focus();
  } else if (formState === 'incorrect') {
    elements.input.classList.add('is-invalid');
    elements.feedback.classList.replace('text-success', 'text-danger');
    elements.feedback.textContent = i18nInstance.t('errors.invalidURL');
  }
};
// const postRender = (posts, elements) => {
//   const div = document.createElement('div');
//   div.classList.add('card', 'border-0');
//   elements.posts.append(div);

//   const secondDiv = document.createElement('div');
//   div.classList.add('card-body');
//   const h2 = document.createElement('h2');
//   h2.classList.add('card-title', 'h4');
//   h2.textContent = 'Посты';
//   div.append(secondDiv);
//   secondDiv.append(h2);

//   const ul = document.createElement('ul');
//   ul.classList.add('list-group', 'border-0', 'rounded-0');
//   div.append(ul);

//   posts.foreEach((post) => {
//     const li = document.createElement('li');
//     const a = document.createElement('a');
//     a.setAttribute('href', post.link);
//     a.textContent = post.title;
//     a.append(li);

//     ul.append(li);
//   });
// };

export default (state, elements, i18nInstance) => onChange(state, (path, value) => {
  switch (path) {
    case 'status':
      formRender(value, elements, i18nInstance);
      break;
    case 'posts':
      break;
    default:
      break;
  }
});
