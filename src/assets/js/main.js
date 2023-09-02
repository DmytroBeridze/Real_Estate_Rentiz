import burger from "./burger";
import search from "./search.js";
import filter from "./filter.js";
import postRequest from "./postRequest";
// import Swiper JS
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
// Swiper.use([Navigation, Pagination]);

const errorBox = document.querySelector(".search__error");

document.addEventListener("DOMContentLoaded", () => {
  burger(".menu__burger-icon", ".header__menu", ".menu__link", "active");

  let state = {};
  let orderNumber = {};
  search(
    ".item-button",
    ".search__item",
    ".search__text",
    ".search__list",
    ".search__icon",
    "active",
    state
  );
  filter(
    ".search__button_container",
    ".popup-main",
    ".popup-main__card",
    ".search__error",
    ".popup-main__close",
    "./api/realEstate.json",
    state,
    orderNumber
  );
  postRequest(
    orderNumber,
    ".popup-description__message",
    ".popup-description__button"
  );

  // -----------popup Decoration Slider
  // const swiper = new Swiper(".sliderPopupDescription", {
  //   modules: [Navigation, Pagination],

  //   slidesPerView: 3,
  //   spaceBetween: 10,
  //   // Navigation arrows
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  //   scrollbar: {
  //     el: ".swiper-scrollbar",
  //   },
  // });
});
