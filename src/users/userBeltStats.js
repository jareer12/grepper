const fetch = require("node-fetch");
const { intToBool } = require("../misc/misc");

async function userBeltStats(user_id) {
  if (!user_id || user_id == null || user_id == undefined) {
    return {
      Success: false,
      Message: `No UserId Query Provided`,
    };
  }
  if (typeof user_id !== "number") {
    return {
      Success: false,
      Message: `PHPSESSID must be a number, got ${typeof user_id}`,
    };
  }
  return fetch(
    `https://www.codegrepper.com/api/get_user_stats.php?uid=${user_id}`
  )
    .then((response) => {
      return response.text();
    })
    .then((myJson) => {
      if (myJson == "Unauthorized")
        return {
          Success: false,
          Message: `Belt is Set to Private`,
        };
      try {
        Data = JSON.parse(myJson);
        return {
          Success: true,
          isPrivate: intToBool(Data.is_rank_private),
          Percentage: Data.coding_belt[2],
          NextBelt: Data.coding_belt[2],
          CurrentBelt: Data.coding_belt[0],
        };
      } catch {
        return {
          Success: false,
          Message: `Unable To Fetch User Data`,
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

module.exports = userBeltStats;
