export default (feeds, elements, i18nInstance) => {
  elements.feeds.textContent = '';
  const mainDiv = document.createElement('div');
  const divForH2 = document.createElement('div');
  const h2 = document.createElement('h2');
  const ul = document.createElement('ul');

  mainDiv.classList.add('card', 'border-0');
  divForH2.classList.add('card-body');
  h2.classList.add('card-title', 'h4');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  h2.textContent = i18nInstance.t('feeds');

  elements.feeds.append(mainDiv);
  mainDiv.append(divForH2, ul);
  divForH2.append(h2);

  feeds.forEach(({ title, description }) => {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');

    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    h3.classList.add('h6', 'm-0');
    p.classList.add('m-0', 'small', 'text-black-50');

    h3.textContent = title;
    p.textContent = description;

    ul.append(li);
    li.append(h3, p);
  });
};
