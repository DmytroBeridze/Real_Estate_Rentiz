import burger from "./burger";
import search from "./search.js";
import filter from "./filter.js";
import postRequest from "./postRequest";
import popularResidense from "./popularResidense.js";
import popup from "./popup";
import orderForm from "./form.js";
// ------------swiper
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

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
  // --------------all view properties galery BIG img

  popularResidense(
    ".properties__galery",
    ".popup-properties__galery",
    ".popup-properties__bigImg-cont",
    ".properties-galery__close",
    "active",
    ".properties__close"
  );
  // --------------popular residense slider BIG image
  popularResidense(
    ".popular-residence__slider-wrapper",
    ".popular-residence__slider-popup",
    ".popular-residence__bigImg-cont",
    ".popular-residence__popup-close",
    "active",
    ".properties__close"
  );
  //------------ popup all view properties
  popup(
    ".popular-residence__link",
    ".popup-properties",
    ".popup-properties__close",
    "active"
  );
  // -----------popup find homes
  popup(
    ".find-homes__button",
    ".find-homes__popup",
    ".find-homes__close",
    "active"
  );
  // --------------form
  orderForm();
  // ------------toggle pages
  const menuItems = document.querySelectorAll(".menu__link");
  menuItems.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      let pages = document.querySelectorAll(".sections");
      pages.forEach((elem) => (elem.style.display = "none"));
      let target = document.querySelector(elem.getAttribute("href"));
      target.style.display = "block";
    });
  });

  // ----------------------Popular residense slider
  const popularResidenceSwiper = new Swiper(".popular-residence__slider", {
    modules: [Navigation, Pagination],
    // Optional parameters
    spaceBetween: 20,
    slidesPerView: 1,

    // loop: true,
    breakpoints: {
      992: {
        slidesPerView: 3,
      },
      654: {
        slidesPerView: 2,
      },
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  // ----------------------Popular residense slider
  const chooseSlider = new Swiper(".choose-slider__slider", {
    modules: [Navigation, Pagination],

    // Optional parameters
    spaceBetween: 20,
    slidesPerView: 1,
    autoHeight: true,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // -------------------find-homes slider
  const findHomesSliders = document.querySelectorAll(".find-homes__slider");
  if (findHomesSliders.length > 0) {
    findHomesSliders.forEach((elem) => {
      new Swiper(elem, {
        modules: [Autoplay, EffectFade],
        slidesPerView: 1,
        // autoplay: {
        //   delay: 5000,
        // },
        effect: "fade",
      });
    });
  }
});
