const fetch = require("node-fetch");
async function inviteToTeam(tokenData) {
  const dataArray = [];
  const token = tokenData.token;
  const userId = tokenData.userId;
  const teamId = tokenData.teamId;
  const usersArray = tokenData.usersArray;
  usersArray.forEach((element) => {
    dataArray.push({
      team_id: teamId.toString(),
      user_id: element.toString(),
    });
  });
  return fetch(`https://www.codegrepper.com/api/add_team_members.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
      "x-auth-id": userId,
    },
    body: JSON.stringify(dataArray),
  })
    .then((response) => {
      if (response.status !== 200) {
        return {
          Success: false,
          Message: `Unable To Send Invitation`,
        };
      }
      return response.text();
    })
    .then((myJson) => {
      if (myJson == "") {
        return {
          Success: true,
          Message: `Successfuly Sent Invitation`,
        };
      } else {
        try {
          Data = JSON.parse(myJson);
          if (myJson.success) {
            if (myJson.success == false && myJson.reason == "Unauthorized") {
              return {
                Success: false,
                Message: `Unauthorized, Token is not valid`,
              };
            }
          }
        } catch {
          if (response.status !== 200) {
            return {
              Success: false,
              Message: `Unable To Send Invitation`,
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

module.exports = inviteToTeam;
