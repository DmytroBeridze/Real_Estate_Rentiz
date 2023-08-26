import postRequest from "./postRequest.js";
import getRequest from "./getRequest";
const filter = (
  buttonSelector,
  contentSelector,
  errorContainer,
  closeButtonSelector,
  state,
  URL
) => {
  const button = document.querySelector(buttonSelector),
    content = document.querySelector(contentSelector),
    errorBox = document.querySelector(errorContainer),
    closeButton = document.querySelector(closeButtonSelector);

  // --------open
  const openModal = () => {
    content.classList.add("active");
    document.body.classList.add("active");
  };
  //-------- close
  const closeModal = () => {
    content.classList.remove("active");
    document.body.classList.remove("active");
    document.querySelector(".popup-main__card").innerHTML = "";
  };

  getRequest(URL)
    .then((json) => {
      button.addEventListener("click", () => {
        let result = json.filter((elem) => {
          return (
            JSON.stringify(elem.data).toLowerCase() ==
            JSON.stringify(state).toLowerCase()
          );
        });
        if (result.length > 0) {
          result.forEach((elem) => {
            let { img, price, description, lot, data } = elem;
            let { purpose } = data;
            document.querySelector(".popup-main__card").innerHTML += `
            <div class="popup-main__card-wrapper">
          <div class="popup-main__img">
          <img src="${img}" alt="card">
          </div>
          <div class="popup-main__description-container">
          <div class="popup-main__desc">${description}</div>
          <div class="popup-main__order-container">
          <div class="popup-main__price"> Price: ${price}</div>
          <button class="popup-main__button" data-lot="${lot}" data-price="${price}"  data-purpose="${purpose}">Order</button>
          </div>
          </div>
        </div>
        `;
          });
          openModal();
        } else {
          errorBox.innerHTML = "No offers";
          errorBox.style.display = "block";
        }
        closeButton.addEventListener("click", () => {
          closeModal();
        });
        postRequest();
      });
    })
    .then(() => {
      // postRequest();

      closeButton.addEventListener("click", () => {
        closeModal();
      });
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
};

export default filter;
