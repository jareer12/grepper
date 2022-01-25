const { intToBool } = require("../misc/misc");
const fetch = require("node-fetch");
async function getPrivacySettings(tokenData) {
  const token = tokenData.token;
  const userId = tokenData.userId;
  if (typeof token != "string") {
    return {
      Success: false,
      Message: `Token must be a string, got ${typeof token}`,
    };
  }
  return await fetch(`https://www.codegrepper.com/api/account_privacy.php`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
      "x-auth-id": userId,
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        return {
          Success: false,
          Message: `Codegrepper Server did not return a response 200`,
        };
      }
      return response.text();
    })
    .then((myJson) => {
      if (myJson) {
        try {
          Data = JSON.parse(myJson);
          if (Data.store_anon_history) {
            return {
              Success: true,
              Message: `Successfuly Fetched Privacy Settings`,
              Data: {
                store_anon_history: intToBool(Data.store_anon_history),
                enable_coding_activity: intToBool(Data.enable_coding_activity),
                is_rank_private: intToBool(Data.is_rank_private),
              },
            };
          } else {
            if (
              Data.success == false &&
              Data.reason.toLowerCase() == "unauthorized"
            ) {
              return {
                Success: false,
                Message: `Unauthorized, token is not valid`,
              };
            } else {
              return {
                Success: false,
                Message: `Data Fetching Error`,
              };
            }
          }
        } catch {
          return {
            Success: false,
            Message: `Could Not Fetched Data, Server Might Be Down`,
          };
        }
      } else {
        return {
          Success: false,
          Message: `Could Not Fetched Data, Server Might Be Down`,
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
module.exports = getPrivacySettings;
