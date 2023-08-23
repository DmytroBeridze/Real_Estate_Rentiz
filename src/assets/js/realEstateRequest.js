const getRequest = async (url) => {
  const request = await fetch(url),
    response = await request.json();
  return response;
};

export { getRequest };
