export default (error, elements, i18nInstance) => {
  elements.feedback.textContent = i18nInstance.t(`errors.${error}`);
};
