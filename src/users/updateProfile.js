const fetch = require("node-fetch");
const FormData = require("form-data");

async function updateProfile(data) {
  const token = data.token;
  const userId = data.userId;
  const DataToSend = new FormData();
  DataToSend.append("update", "profile_basic");
  DataToSend.append("fun_name", data.funName || "");
  DataToSend.append("real_name", data.realName || "");
  DataToSend.append("twitter_name", data.twitterName || "");
  DataToSend.append("website_url", data.websiteURL || "");
  DataToSend.append("location", data.location || "");
  DataToSend.append("donate_link", data.donateURL || "");
  DataToSend.append("how_to_help", data.howToHelp || "");
  return fetch(`https://www.codegrepper.com/api/profile.php`, {
    method: "POST",
    body: DataToSend,
    headers: {
      "x-auth-token": token,
      "x-auth-id": userId,
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        return {
          Success: false,
          Message: `Request failed, server returned response code ${response.status}`,
        };
      }
      return response.text();
    })
    .then((results) => {
      if (JSON.parse(results).Success == false) {
        return {
          Success: false,
          Message: JSON.parse(results).Message,
        };
      }
      return {
        Success: true,
        Message: `Profile Updated`,
        Data: { URL: `https://www.codegrepper.com/profile/${results}` },
      };
    })
    .catch((err) => {
      return {
        Success: false,
        Message: err,
      };
    });
}

module.exports = updateProfile;
