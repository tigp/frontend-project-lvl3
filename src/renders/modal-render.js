export default (watchedState, elements) => {
  const targetPost = watchedState.posts
    .flat()
    .find((post) => post.id === watchedState.uiState.targetPostId);

  elements.modalTitle.textContent = targetPost.title;
  elements.modalBody.textContent = targetPost.description;
  elements.modalLink.setAttribute('href', targetPost.link);
};
