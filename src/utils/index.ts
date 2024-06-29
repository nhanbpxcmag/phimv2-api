export const isNullUndefined = (value) => {
  return value === null || value === '' || value === undefined ? true : false;
};

export const generateFilePath = (params: {
  path: string;
  filename: string;
  ext: string;
}) => {
  let { path, filename, ext } = params;
  path = path ? path + '/' : '';
  return path + filename + '.' + ext;
};
export const generateFileUrl = (
  params: {
    path: string;
    filename: string;
    ext: string;
    host: string;
  },
  type = 'stream',
) => {
  var expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  var regex = new RegExp(expression);
  let { path, filename, ext, host } = params;
  if (!filename) return '';
  path = path ? path + '/' : '';
  let url = path + filename + '.' + ext;
  let sub = type === 'stream' ? '/file/static/' : '/file/sub/';
  let match = url.match(regex);
  return match ? url : host + sub + url;
};
