import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
const popularResidense = () => {
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
};
export default popularResidense;
