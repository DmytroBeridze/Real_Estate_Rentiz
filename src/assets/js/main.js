import burger from "./burger";
import search from "./search.js";
import filter from "./filter.js";
// import realEstateRequest from "./realEstateRequest.js";
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

  filter(
    ".search__button_container",
    ".popup-main",
    ".search__error",
    ".popup-main__close",
    state,
    "./api/realEstate.json"
  );
});
