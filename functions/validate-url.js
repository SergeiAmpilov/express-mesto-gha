module.exports.validateUrl = (url) => {
  const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
  if (regex.test(url)) {
    return url;
  }
  throw new Error('Invalid url');
};
