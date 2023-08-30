const search = (
  targetSelector,
  buttonSelector,
  titleSelector,
  contentSelector,
  iconSelector,
  activeClass,
  state
) => {
  const infoButton = document.querySelectorAll(buttonSelector);

  infoButton.forEach((elem) => {
    if (!elem.matches(targetSelector)) {
      elem.addEventListener("click", (e) => {
        elem.querySelector(contentSelector).classList.toggle(activeClass);
        elem.querySelector(iconSelector).classList.toggle(activeClass);
        if (
          e.target.matches(contentSelector) ||
          e.target.parentNode.matches(contentSelector)
        ) {
          elem.querySelector(titleSelector).innerHTML = e.target.innerHTML;
          let st = elem.dataset.type;
          state[st] = e.target.innerHTML;
        }
        // return state;
      });
    }
  });
};
export default search;
