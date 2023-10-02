const popularResidense = (
  targetSelector,
  contentSelector,
  imgContainerSelector,
  buttonCloseSelector,
  activeClass,
  responsiveClose = null
) => {
  const galeryContainer = document.querySelector(targetSelector),
    content = document.querySelector(contentSelector),
    bigImg = document.querySelector(imgContainerSelector),
    closeBtn = document.querySelector(buttonCloseSelector),
    responsiveCloseBtn = document.querySelector(responsiveClose);
  galeryContainer.addEventListener("click", (e) => {
    if (e.target.tagName == "IMG") {
      content.classList.add(activeClass);
      if (e.target.parentNode != closeBtn) {
        let imgSrc = e.target.getAttribute("src");

        bigImg.innerHTML = `<img class="popup-properties__img" src="${imgSrc}" alt="" />`;
      }
    }
  });

  // close
  content.addEventListener("click", (e) => {
    if (e.target == content) {
      content.classList.remove(activeClass);
    }
  });
  closeBtn.addEventListener("click", (e) => {
    content.classList.remove(activeClass);
  });
  //------responsive btn
  responsiveCloseBtn.addEventListener("click", (e) => {
    document.querySelector(".popup-properties").classList.remove(activeClass);
    document.body.classList.remove(activeClass);
  });
};
export default popularResidense;
