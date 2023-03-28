const context = require.context("../assets/img/flags", true, /.svg$/);

const flags = {};
context.keys().forEach((key) => {
  const countryCode = key
    .split("./")
    .pop() // remove the first 2 characters
    .substring(0, key.length - 6); // remove the file extension
  flags[countryCode] = context(key);
});

export default flags;
