const galery = () => {
  const galeryContainer = document.querySelector(".slider-popup"),
    galeryPopup = document.querySelector(".popup-galery"),
    contentContainer = document.createElement("div"),
    bigImg = document.createElement("img");

  contentContainer.classList.add("popup-galery__contentContainer");
  bigImg.classList.add("popup-galery__image");
  contentContainer.appendChild(bigImg);
  galeryPopup.appendChild(contentContainer);

  galeryContainer.addEventListener("click", (e) => {
    if (e.target.tagName == "IMG") {
      galeryPopup.classList.add("active");
      bigImg.src = e.target.getAttribute("src").substring(1);
    }
  });
  galeryPopup.addEventListener("click", (e) => {
    if (e.target == galeryPopup) {
      galeryPopup.classList.remove("active");
    }
  });

  galeryPopup.addEventListener("mouseover", (e) => {
    if (e.target !== bigImg) {
      e.target.style.cursor = "pointer";
    } else e.target.style.cursor = "auto";
  });
};
export default galery;
