const getRequest = async (url) => {
  const request = await fetch(url);
  if (request.ok) {
    const response = await request.json();
    return response;
  } else {
    throw new Error("Some error occurred");
  }
};

export default getRequest;
