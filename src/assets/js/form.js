const orderForm = () => {
  const forms = [...document.forms];
  const URL = "https://test-key-d6afb-default-rtdb.firebaseio.com/test.json";
  // userName = form.userName,
  // userEmail = form.userEmail,
  // userPhone = form.userPhone,
  // button = form.buttonSend;

  // --------------loading statuses----
  const loadingStatus = {
    loading: "Data loading",
    sent: "Data sent",
    error: "Data error",
  };
  const statusContainer = document.createElement("div");
  statusContainer.classList.add("find-form__statusContainer");

  // ---------------request----------
  const xmlRequest = (url, method, body) => {
    return new Promise((resolve, reject) => {
      let xml = new XMLHttpRequest();
      xml.open(method, url);
      xml.responseType = "json";
      xml.setRequestHeader("Content-type", "application/json");
      xml.onload = () => {
        if (xml.status >= 400) {
          reject(new Error("Error first"));
        } else resolve(xml.response);
      };
      xml.onerror = () => {
        reject(new Error("Error second"));
      };
      xml.send(JSON.stringify(body));
      statusContainer.classList.add("green");
      statusContainer.innerHTML = loadingStatus["loading"];
    });
  };

  // --------------form-------
  forms.forEach((elem) => {
    const inputs = elem.elements;

    elem.append(statusContainer);
    elem.addEventListener("submit", (e) => {
      e.preventDefault();

      let formData = new FormData(elem);
      let userData = Object.fromEntries(formData);
      xmlRequest(URL, "POST", userData)
        .then(() => {
          statusContainer.innerHTML = loadingStatus["sent"];
          for (let input of inputs) {
            if (input.getAttribute("type") !== "submit") {
              input.value = "";
            }
          }
        })
        .catch((err) => {
          statusContainer.classList.add("red");
          statusContainer.innerHTML = loadingStatus["error"];
        })
        .finally(() => {
          setTimeout(() => {
            statusContainer.innerHTML = "";
          }, 4000);
        });
    });
  });
};

export default orderForm;
