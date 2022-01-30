const fetch = require("node-fetch");
const FormData = require("form-data");
const { getBuffer } = require("../misc/misc");

async function updateProfileImage(data) {
  const token = data.token;
  const userId = data.userId;
  const DataToSend = new FormData();
  const image = await getBuffer(data.imageURL);
  DataToSend.append("update", "profile_image");
  DataToSend.append("file", image, { filename: "image.png" });
  return await fetch(`https://www.codegrepper.com/api/profile.php`, {
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
        Message: `Profile Image Updated.`,
        Data: results,
      };
    })
    .catch((err) => {
      return {
        Success: false,
        Message: err,
      };
    });
}

module.exports = updateProfileImage;
