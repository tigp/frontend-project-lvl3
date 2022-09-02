export default (posts, elements, i18nInstance) => {
  elements.posts.textContent = '';
  const mainDiv = document.createElement('div');
  const divForH2 = document.createElement('div');
  const h2 = document.createElement('h2');
  const ul = document.createElement('ul');

  mainDiv.classList.add('card', 'border-0');
  divForH2.classList.add('card-body');
  h2.classList.add('card-title', 'h4');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  h2.textContent = i18nInstance.t('posts');

  elements.posts.append(mainDiv);
  mainDiv.append(divForH2, ul);
  divForH2.append(h2);

  posts.flat().forEach(({ title, link }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const button = document.createElement('button');

    a.setAttribute('href', link);
    a.setAttribute('data-id', '2');
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    button.setAttribute('type', 'button');
    button.setAttribute('data-id', '2');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');

    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    a.classList.add('fw-bold');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');

    a.textContent = title;
    button.textContent = i18nInstance.t('button');

    ul.append(li);
    li.append(a, button);
  });
};
