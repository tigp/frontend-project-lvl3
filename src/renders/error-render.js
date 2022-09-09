export default (error, elements, i18nInstance) => {
  if (error === null) {
    return;
  }

  elements.feedback.textContent = i18nInstance.t(`errors.${error}`);
};
