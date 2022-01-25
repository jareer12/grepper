const fetch = require("node-fetch");

async function checkToken(tokenData) {
  const token = tokenData.token;
  const userId = tokenData.userId;
  return new Promise((res, rej) => {
    return fetch(
      `https://www.codegrepper.com/api/get_belt_users.php?offset=0&limit=1`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
          "x-auth-id": userId,
        },
      }
    )
      .then((response) => {
        return response.text();
      })
      .then((myJson) => {
        try {
          Data = JSON.parse(myJson);
          if (Data.success) {
            if (Data.success == false && Data.reason == "Unauthorized") {
              rej({ Success: false, Message: `Invalid Cookie Provided` });
            } else if (Data.success == false) {
              rej({ Success: false, Message: `Invalid Cookie Provided` });
            }
          }
          if (Data.users) {
            res({
              Success: true,
              Message: `Token Valid & is Usable`,
              Cookie: cookie,
            });
          }
        } catch {
          rej({
            Success: false,
            Message: `Couldn't fetch data, server may be down temporarily`,
          });
        }
      })
      .catch((err) => {
        rej({
          Success: false,
          Message: err,
        });
      });
  });
}

module.exports = checkToken;
