const context = require.context("../assets/img/drivers", true, /.avif$/);

const useDrivers = {};
context.keys().forEach((key) => {
  const driver = key
    .split("./")
    .pop()
    .substring(0, key.length - 6);
  useDrivers[driver] = context(key);
});

export default useDrivers;
