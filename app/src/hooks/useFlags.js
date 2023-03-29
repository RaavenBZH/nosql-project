const context = require.context("../assets/img/flags", true, /.svg$/);

const useFlags = {};
context.keys().forEach((key) => {
  const countryCode = key
    .split("./")
    .pop()
    .substring(0, key.length - 6);
  useFlags[countryCode] = context(key);
});

export default useFlags;
