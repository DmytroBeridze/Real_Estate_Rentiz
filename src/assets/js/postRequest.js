const postRequest = (orderNumber, messageContainerSelector) => {
  let messageContainer = document.querySelector(messageContainerSelector);
  let orderBtn = document.querySelector(".popup-description__button");

  const statusMessage = {
    processing: "Order processing",
    success: "Order successfully submitted",
    error: "Order error",
  };
  // orderBtn.disabled = false;
  const setRequest = async (data) => {
    messageContainer.innerHTML = statusMessage.processing;
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
        messageContainer.innerHTML = statusMessage.success;
        messageContainer.style.display = "block";
        orderBtn.disabled = true;
      })
      .catch((e) => {
        messageContainer.innerHTML = statusMessage.error;
        messageContainer.style.display = "block";
      })
      .finally(() => {
        setTimeout(() => {
          messageContainer.style.display = "none";
        }, 3000);
      });
  });
};

export default postRequest;
