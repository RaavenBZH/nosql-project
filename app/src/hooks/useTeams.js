const context = require.context("../assets/img/teams", true, /.avif$/);

const useTeams = {};
context.keys().forEach((key) => {
  const team = key
    .split("./")
    .pop()
    .substring(0, key.length - 7);
  useTeams[team] = context(key);
});

export default useTeams;
