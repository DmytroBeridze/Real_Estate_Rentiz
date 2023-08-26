const popupDescriptionOpen = (
  openButtonSelector,
  contentSelector,
  closeButtonSelector,
  activeClass
) => {
  const openButton = document.querySelectorAll(openButtonSelector),
    content = document.querySelector(contentSelector),
    closeBtn = document.querySelector(closeButtonSelector);

  //------------ open
  const openModal = () => {
    content.classList.add("active");
    document.body.classList.add("active");
  };
  //-------- close
  const closeModal = () => {
    content.classList.remove("active");
    document.body.classList.remove("active");
  };

  openButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log(e.target);
      openModal();
    });
  });
  closeBtn.addEventListener("click", () => {
    closeModal();
  });
};
export default popupDescriptionOpen;
