const fetch = require("node-fetch");

async function userStats(user_id) {
  if (!user_id || user_id == null || user_id == undefined) {
    return {
      Success: false,
      Message: `No UserId Query Provided`,
    };
  }
  if (typeof user_id !== "number") {
    return {
      Success: false,
      Message: `userId must be a number, got ${typeof user_id}`,
    };
  }
  return fetch(
    `https://www.codegrepper.com/api/profile_helped_stats.php?id=${user_id}`
  )
    .then((response) => {
      return response.text();
    })
    .then((myJson) => {
      try {
        Data = JSON.parse(myJson);
        return {
          Success: true,
          DevelopersHelped: Data.developers_helped,
          ProblemsSolved: Data.hits,
        };
      } catch {
        return {
          Success: false,
          Message: `Unable To Fetch Users Stats`,
        };
      }
    })
    .catch((err) => {
      return {
        Success: false,
        Message: err,
      };
    });
}

module.exports = userStats;
