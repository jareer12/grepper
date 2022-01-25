const fetch = require("node-fetch");
const chalk = require("chalk");
const { intToBool } = require("../misc/misc");

async function getPrivacySettings(cookie, toLog) {
  if (!cookie || cookie == null || cookie == undefined) {
    if (toLog == true) {
      console.log(chalk.red(`No Cookie Provided`));
    }
    return {
      Success: false,
      Message: `No Cookie Provided`,
    };
  }
  if (typeof cookie !== "string") {
    if (toLog == true) {
      console.log(
        chalk.red(`PHPSESSID must be a string, got ${typeof cookie}(${cookie})`)
      );
    }
    return {
      Success: false,
      Message: `PHPSESSID must be a string, got ${typeof cookie}`,
    };
  }
  return await fetch(`https://www.codegrepper.com/api/account_privacy.php`, {
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
      cookie: `PHPSESSID=${cookie}; grepper_web_access_token=${cookie}`,
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        if (toLog == true) {
          console.log(chalk.red(`Unable To Enable Comment Notifications`));
        }
        return {
          Success: false,
          Message: `Unable To Enable Comment Notifications`,
        };
      }
      return response.text();
    })
    .then((myJson) => {
      if (myJson == "") {
        if (toLog == true) {
          console.log(chalk.green(`Successfuly Enabled Comment Notifications`));
        }
        return {
          Success: true,
          Message: `Successfuly Enabled Comment Notifications`,
        };
      } else {
        try {
          Data = JSON.parse(myJson);
          if (Data) {
            return {
              Success: true,
              Message: `Successfuly Fetched Privacy Settings`,
              Data: {
                StoreAnonymousHistory: intToBool(Data.store_anon_history),
                isActivityPublic: intToBool(Data.enable_coding_activity),
                isRankPrivate: intToBool(Data.is_rank_private),
              },
            };
          } else {
            if (Data.success == false && Data.reason == "Unauthorized") {
              if (toLog == true) {
                console.log(chalk.red(`Unauthorized, Cookie is not valid`));
              }
              return {
                Success: false,
                Message: `Unauthorized, Cookie is not valid`,
              };
            } else {
              return {
                Success: false,
                Message: `Unknown Error Occured`,
              };
            }
          }
        } catch {
          return {
            Success: false,
            Message: `Could Not Fetched Data, Server Might Be Down`,
          };
        }
      }
    })
    .catch((err) => {
      if (!toLog == true) {
        console.log(chalk.red(`An Unknown Error Occured`));
      } else {
        console.log(chalk.red(err));
      }
      return {
        Success: false,
        Message: err,
      };
    });
}

module.exports = getPrivacySettings;
