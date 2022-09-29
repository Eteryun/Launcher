const toCamel = (string: string) => {
  const result = string
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/ (.)/g, function ($1) {
      return $1.toUpperCase();
    })
    .replace(/ /g, '');

  return result.charAt(0).toLowerCase() + result.slice(1);
};

export const keysToCamelCase = (object: { [k: string]: unknown }): unknown => {
  object = Object(object);
  const result: { [k: string]: unknown } = {};

  Object.keys(object).forEach((key: string) => {
    const value = object[key];
    const newKey = toCamel(key);
    result[newKey] = value;
  });

  return result;
};

export const compareVersions = (local: string, remote: string) => {
  const localArray = local
    .replace(/\./g, ' .')
    .split(' ')
    .map((x) => parseFloat(x));
  const remoteArray = remote
    .replace(/\./g, ' .')
    .split(' ')
    .map((x) => parseFloat(x));

  for (let i = 0; i < Math.max(localArray.length, remoteArray.length); i++) {
    if ((localArray[i] || 0) < (remoteArray[i] || 0)) {
      return -1;
    } else if ((localArray[i] || 0) > (remoteArray[i] || 0)) {
      return 1;
    }
  }

  return 0;
};

export const bytesFormatter = (bytes: number) => {
  if (bytes == 0) return '0 Bytes';

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(1)) + ' ' + sizes[i];
};
