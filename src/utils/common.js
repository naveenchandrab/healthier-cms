export const removeSearchParams = pristineURL => {
  const url = new URL(pristineURL);
  url.search = '';
  return url.toString();
};
