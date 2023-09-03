const postRequest = (
  orderNumber,
  messageContainerSelector,
  popupButtonSelector
) => {
  let messageContainer = document.querySelector(messageContainerSelector);
  let orderBtn = document.querySelector(popupButtonSelector);
  const loader = document.createElement("div");
  loader.classList.add("loader");

  const statusMessage = {
    processing: "Order processing",
    success: "Order successfully submitted",
    error: "Order error",
  };
  const setRequest = async (data) => {
    // messageContainer.innerHTML = statusMessage.processing;
    // messageContainer.style.color = "var(--gray-text-color)";
    messageContainer.append(loader);
    messageContainer.style.display = "block";
    const request = await fetch(
      "https://test-key-d6afb-default-rtdb.firebaseio.com/test.json",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const response = await request.json();
    return response;
  };

  orderBtn.addEventListener("click", (e) => {
    setRequest(orderNumber)
      .then(() => {
        messageContainer.style.color = "var(--accent-color)";
        messageContainer.innerHTML = statusMessage.success;
        orderBtn.disabled = true;
      })
      .catch((e) => {
        messageContainer.innerHTML = statusMessage.error;
      })
      .finally(() => {
        setTimeout(() => {
          messageContainer.innerHTML = "";
          messageContainer.style.color = "rgb(248, 47, 16)";
        }, 3000);
      });
  });
};

export default postRequest;
