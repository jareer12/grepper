const fetch = require("node-fetch");
const FormData = require("form-data");
const { isEmail } = require("../misc/misc");

async function sendPasswordResetEmail(email) {
  if (!isEmail(email)) {
    return {
      Success: false,
      Message: `Provided Email Is Not Valid`,
    };
  }
  if (!email) {
    return {
      Success: false,
      Message: `No Email Provided`,
    };
  }
  if (typeof email !== "string") {
    return {
      Success: false,
      Message: `PHPSESSID must be a string, got ${typeof email}`,
    };
  }

  const DataToSend = new FormData();
  DataToSend.append("email", email);
  return fetch(`https://www.codegrepper.com/api/account_privacy.php`, {
    method: "POST",
    body: DataToSend,
  })
    .then((response) => {
      return response.text();
    })
    .then((myJson) => {
      try {
        Data = JSON.parse(myJson);
        if (Data.success) {
          return {
            Success: true,
            Message: `Password Reset Email Has Been Sent`,
          };
        } else {
          return {
            Success: false,
            Message: Data.errors[0] || "Unknown Error",
          };
        }
      } catch {
        return {
          Success: false,
          Message: `Couldn't fetch data, server may be down temporarily`,
        };
      }
    })
    .catch((err) => {
      console.log(chalk.red(err));
      return {
        Success: false,
        Message: err,
      };
    });
}

module.exports = sendPasswordResetEmail;
