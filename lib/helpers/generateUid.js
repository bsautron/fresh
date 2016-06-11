export default (len) => {
  let buf = [];
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charlen = chars.length;

  for (let i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
