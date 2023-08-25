const getRequest = async (url) => {
  const request = async () => {
    const request = await fetch(url),
      response = await request.json();
    return response;
  };
  return request();
};
export default getRequest;
