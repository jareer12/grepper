const fetch = require("node-fetch");
const { intToBool } = require("../misc/misc");

async function userByToken(tokenData) {
  const token = tokenData.token;
  const userId = tokenData.userId;
  return fetch(`https://www.codegrepper.com/api/account.php`, {
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
        Data = JSON.parse(myJson);
        if (Data) {
          return {
            Success: true,
            Name: Data.fun_name,
            DonateLink: Data.donate_link,
            CommentNotif: intToBool(Data.notify_on_comments),
          };
        } else {
          return {
            Success: false,
            Message: `User Fun Name Not Found`,
          };
        }
      } catch {
        return {
          Success: false,
          Message: `Couldn't Fetch Username`,
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

module.exports = userByToken;
