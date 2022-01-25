const fetch = require("node-fetch");
async function enableCommentNotif(tokenData) {
  const token = tokenData.token;
  const userId = tokenData.userId;
  return fetch(
    `https://www.codegrepper.com/api/update_notification_settings.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
        "x-auth-id": userId,
      },
      body: JSON.stringify({
        update_name: "notify_on_comments",
        update_value: 1,
      }),
    }
  )
    .then((response) => {
      if (response.status !== 200) {
        return {
          Success: false,
          Message: `Unable To Enable Comment Notifications`,
        };
      }
      return response.text();
    })
    .then((myJson) => {
      if (myJson == "") {
        return {
          Success: true,
          Message: `Successfuly Enabled Comment Notifications`,
        };
      } else {
        try {
          Data = JSON.parse(myJson);
          if (myJson.success) {
            if (myJson.success == false && myJson.reason == "Unauthorized") {
              return {
                Success: false,
                Message: `Unauthorized, Cookie is not valid`,
              };
            }
          }
        } catch {
          if (response.status !== 200) {
            return {
              Success: false,
              Message: `Unable To Enable Comment Notifications`,
            };
          }
        }
      }
    })
    .catch((err) => {
      return {
        Success: false,
        Message: err,
      };
    });
}

module.exports = enableCommentNotif;
