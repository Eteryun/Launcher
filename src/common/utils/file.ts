export const getNameFromUrl = (url: string, extension = true) => {
  const urlSplit = url.split('/');
  const name = urlSplit[urlSplit.length - 1];
  return extension ? name : name.replace(/\.[^/.]+$/g, '');
};
