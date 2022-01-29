const fetch = require("node-fetch");
const { toAvatar } = require("../misc/misc");

async function getCommunity(tokenData, limit) {
  const token = tokenData.token;
  const userId = tokenData.userId;
  return fetch(
    `https://www.codegrepper.com/api/get_belt_users.php?offset=0&limit=${
      limit || 100
    }`,
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
        data_array = [];
        Data = JSON.parse(myJson).users;
        if (Data.length <= 0) {
          return {
            Success: true,
            Message: `No Data Fetched`,
          };
        }
        for (i = 0; i < Data.length; i++) {
          CU = Data[i];
          data_array.push({
            Id: CU.user_id,
            Username: CU.profile_slug,
            DisplayName: CU.fun_name,
            Avatar: toAvatar(CU.profile_image),
          });
        }
        return {
          Success: true,
          Total: Data.length,
          Data: data_array,
        };
      } catch {
        return {
          Success: false,
          Message: `Unable To Fetch Grepper Community`,
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

module.exports = getCommunity;
