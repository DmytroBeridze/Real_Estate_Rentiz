const popup = (
  buttonSelector,
  popupSelector,
  closeButtonSelector,
  activeClass
) => {
  const buttonOpen = document.querySelectorAll(buttonSelector),
    popupContainer = document.querySelector(popupSelector),
    buttonClose = document.querySelector(closeButtonSelector);

  const open = () => {
    popupContainer.classList.add(activeClass);
    document.body.classList.add(activeClass);
  };

  const close = () => {
    popupContainer.classList.remove(activeClass);
    document.body.classList.remove(activeClass);
  };
  buttonOpen.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      open();
    });
  });

  buttonClose.addEventListener("click", (e) => {
    close();
  });

  popupContainer.addEventListener("click", (e) => {
    if (e.target == popupContainer) {
      close();
    }
  });
};
export default popup;
