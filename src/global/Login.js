const fetch = require("node-fetch");
const FormData = require("form-data");
const { isEmail } = require("../misc/misc");

async function sendPasswordResetEmail(data) {
  const DataToSend = new FormData();
  DataToSend.append("email", data.email);
  DataToSend.append("password", data.password);
  return fetch(`https://www.codegrepper.com/api/login.php`, {
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
            Message: `Successfuly logged in.`,
            Data: Data,
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
      return {
        Success: false,
        Message: err,
      };
    });
}

module.exports = sendPasswordResetEmail;
