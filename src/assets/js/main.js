import burger from "./burger";
import search from "./search.js";
import filter from "./filter.js";
import getRequest from "./getRequest";
import postRequest from "./postRequest.js";
const errorBox = document.querySelector(".search__error");

document.addEventListener("DOMContentLoaded", () => {
  burger(".menu__burger-icon", ".header__menu", ".menu__link", "active");

  let state = {};

  search(
    ".item-button",
    ".search__item",
    ".search__text",
    ".search__list",
    ".search__icon",
    "active",
    state
  );
  getRequest("./api/realEstate.json")
    .then((res) => {
      filter(
        ".search__button_container",
        ".popup-main",
        ".popup-main__close",
        state,
        res
      );
    })
    .catch((e) => {
      errorBox.innerHTML = "Error";
      errorBox.style.display = "block";
    })
    .finally(() => {
      setTimeout(() => {
        errorBox.style.display = "none";
      }, 3000);
    });

  // filter(
  //   ".search__button_container",
  //   ".popup-main",
  //   ".search__error",
  //   ".popup-main__close",
  //   state,
  //   "./api/realEstate.json"
  // );
  // filter(
  //   ".search__button_container",
  //   ".popup-main",
  //   ".search__error",
  //   ".popup-main__close",
  //   state,
  //   "./api/realEstate.json"
  // );
});
