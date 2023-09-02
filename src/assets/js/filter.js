import getRequest from "./getRequest";
import popupDescriptionOpen from "./popupDescriptionOpen.js";

const filter = async (
  buttonSelector,
  popupSelector,
  contentSelector,
  errorContainer,
  closeButtonSelector,
  URL,
  state,
  orderNumber
) => {
  const button = document.querySelector(buttonSelector),
    popup = document.querySelector(popupSelector),
    content = document.querySelector(contentSelector),
    errorBox = document.querySelector(errorContainer),
    closeButton = document.querySelector(closeButtonSelector);

  // --------open
  const openModal = () => {
    popup.classList.add("active");
    document.body.classList.add("active");
  };
  //-------- close
  const closeModal = () => {
    popup.classList.remove("active");
    document.body.classList.remove("active");
    content.innerHTML = "";
  };

  button.addEventListener("click", () => {
    let test = [];
    getRequest(URL)
      .then((json) => {
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
            content.innerHTML += `
            <div class="popup-main__card-wrapper">
          <div class="popup-main__img">
          <img src="${img}" alt="card">
          </div>
          <div class="popup-main__description-container">
          <div class="popup-main__desc">${description}</div>
          <div class="popup-main__order-container">
          <div class="popup-main__price"> Price: ${price}</div>
          <button class="popup-main__button buttons" data-lot="${lot}" data-price="${price}"  data-purpose="${purpose}">more details</button>
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
        return json;
      })

      .then((json) => {
        popupDescriptionOpen(
          ".popup-main__button",
          ".popup-description",
          ".popup-description__info",
          ".popup-description__close",
          "active",
          json,
          orderNumber
        );
        closeButton.addEventListener("click", () => {
          closeModal();
        });
        popup.addEventListener("click", (e) => {
          if (e.target == popup) {
            closeModal();
          }
        });
      })
      .then(() => {
        // postRequest(orderNumber);
      })
      .catch((e) => {
        errorBox.innerHTML = e.message;
        errorBox.style.display = "block";
      })
      .finally(() => {
        setTimeout(() => {
          errorBox.style.display = "none";
        }, 3000);
      });
  });
};

export default filter;
