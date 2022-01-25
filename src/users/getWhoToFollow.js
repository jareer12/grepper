const fetch = require("node-fetch");

async function getWhoToFollow(tokenData) {
  const token = tokenData.token;
  const userId = tokenData.userId;
  return fetch(`https://www.codegrepper.com/api/get_who_to_follow.php`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
      "x-auth-id": userId,
    },
  })
    .then((response) => {
      return response.text();
    })
    .then((myJson) => {
      try {
        Data = JSON.parse(myJson).users;
        if (Data.success) {
          if (Data.success == false && Data.reason == "Unauthorized") {
            return {
              Success: false,
              Message: `Unauthorized, Provided Cookie is invalid`,
            };
          }
        }
        return {
          Success: true,
          Total: Data.length,
          Data: Data,
        };
      } catch {
        return {
          Success: false,
          Message: `Unable To Fetch Grepper Community`,
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

module.exports = getWhoToFollow;
