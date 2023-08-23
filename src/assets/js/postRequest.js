const postRequest = () => {
  let orderBtn = document.querySelectorAll(".popup-main__button");

  const setRequest = async (data) => {
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
  let orderNumber = {
    lotNumber: "",
    price: "",
    purpose: "",
  };
  orderBtn.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      orderNumber = {
        lotNumber: e.target.dataset.lot,
        price: e.target.dataset.price,
        purpose: e.target.dataset.purpose,
      };
      setRequest(orderNumber)
        .then(() => {
          console.log("done");
        })
        .catch((e) => console.log(e));
    });
  });
};

export default postRequest;
