// import postRequest from "./postRequest";

// import Swiper JS
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

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
    // document.body.classList.remove(activeClass);
    content.innerHTML = "";
  };
  // ---------hide slider arrorws if less <3
  const hideSliderArrow = (result) => {
    if (result[0].galery.length <= 3) {
      const sliderArrow = document.querySelectorAll(
        ".slider-popup-description__btn"
      );
      sliderArrow.forEach((elem) => (elem.style.display = "none"));
      //
    }
  };
  // --------galery
  const galery = (arr) => {
    let galeryArr = arr[0].galery;
    let galery = "";
    galeryArr.forEach((elem) => {
      galery += ` 
      <div class="swiper-slide slidePopup"> <img src="${elem}" alt="" /></div>`;
    });
    return galery;
  };

  // -----------render popup
  openButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      // ------------enabled postRequest button
      document.querySelector(".popup-description__button").disabled = false;

      let result = response.filter((elem) => {
        return elem.lot == e.target.dataset.lot;
      });

      let description = `<div class="popup-description__location">${
        result[0].data.location
      }</div>
      <div class="slider-popup">
        <div class="swiper slider-popup-description">
            <div class="swiper-wrapper">
              ${galery(result)}
            </div>
            </div>
            <div class="swiper-button__wrapper">
            <div class="swiper-button-prev   slider-popup-description__btn prev">
            </div>
            <div class="swiper-button-next   slider-popup-description__btn next">
            </div>
            </div>
            </div>

      <div class="popup-description__text">${
        result[0].extended_description
      }</div>
      <div class="popup-description__price"> Price: ${result[0].price}</div>`;
      content.insertAdjacentHTML("afterbegin", description);
      orderNumber.lotNumber = result[0].lot;
      orderNumber.price = result[0].price;
      orderNumber.purpose = result[0].data.purpose;

      openModal();
      hideSliderArrow(result);

      // -----------popup Decoration Slider initial
      const swiper = new Swiper(".slider-popup-description", {
        modules: [Navigation, Pagination],

        slidesPerView: 3,
        spaceBetween: 10,
        // Navigation arrows
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      });
    });
  });
  // --------close button
  closeBtn.addEventListener("click", () => {
    closeModal();
  });
  // --------close popup
  popup.addEventListener("click", (e) => {
    if (e.target == popup) {
      closeModal();
    }
  });
};
export default popupDescriptionOpen;
// <div class="popup-description__galery">${galery(result)}</div>
