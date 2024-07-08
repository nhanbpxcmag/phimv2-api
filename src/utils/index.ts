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
export const generateFileUrl = async (
  params: {
    path: string;
    filename: string;
    ext: string;
    host: string;
  },
  type: 'stream' | 'sub' | 'sub_download' = 'stream',
  publicIP = '',
) => {
  var expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  var regex = new RegExp(expression);
  let { path, filename, ext, host } = params;
  if (!filename) return { current: '', public: '' };
  path = path ? path + '/' : '';
  let url = path + filename + '.' + ext;
  let sub =
    type === 'stream'
      ? '/file/static/'
      : type === 'sub'
        ? '/file/sub/'
        : '/file/sub-download/';
  let match = url.match(regex);
  let data = { current: match ? url : host + sub + url, public: '' };
  if (publicIP) {
    data.public = match ? url : publicIP + sub + url;
  }
  return data;
};

export const getPublicIP = async () => {
  let response = await fetch('https://api.myip.com/');
  const json = await response.json();
  if (json?.ip) {
    return 'http://' + json?.ip + ':' + process.env.PORT;
  }
  return 'http://' + process.env.PUBLIC_DOMAIN + ':' + process.env.PORT;
};
