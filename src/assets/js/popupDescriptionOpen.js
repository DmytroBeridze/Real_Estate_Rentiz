// import postRequest from "./postRequest";
const popupDescriptionOpen = (
  openButtonSelector,
  popupSelector,
  contentSelector,
  closeButtonSelector,
  activeClass,
  response,
  orderNumber
) => {
  // console.log(response);
  const openButton = document.querySelectorAll(openButtonSelector),
    popup = document.querySelector(popupSelector),
    content = document.querySelector(contentSelector),
    closeBtn = document.querySelector(closeButtonSelector);
  //------------ open
  const openModal = () => {
    popup.classList.add(activeClass);
    document.body.classList.add(activeClass);
  };
  //-------- close
  const closeModal = () => {
    popup.classList.remove(activeClass);
    document.body.classList.remove(activeClass);
    content.innerHTML = "";
  };

  openButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      document.querySelector(".popup-description__button").disabled = false;

      let result = response.filter((elem) => {
        return elem.lot == e.target.dataset.lot;
      });
      let description = `<div class="popup-description__location">${result[0].data.location}</div>
      <div class="popup-description__text">${result[0].extended_description}</div>
      <div class="popup-description__price"> Price: ${result[0].price}</div>`;
      content.insertAdjacentHTML("afterbegin", description);
      orderNumber.lotNumber = result[0].lot;
      orderNumber.price = result[0].price;
      orderNumber.purpose = result[0].data.purpose;

      openModal();
    });
  });
  closeBtn.addEventListener("click", () => {
    closeModal();
  });
  popup.addEventListener("click", (e) => {
    if (e.target == popup) {
      closeModal();
    }
  });
};
export default popupDescriptionOpen;
