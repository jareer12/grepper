const fetch = require("node-fetch");
const { toAvatar, intToBool } = require("../misc/misc");

async function userInfo(user_id) {
  if (!user_id || user_id == null || user_id == undefined) {
    return {
      Success: false,
      Message: `No UserId Query Provided`,
    };
  }
  if (typeof user_id !== "number") {
    return {
      Success: false,
      Message: `userId must be a number, got ${typeof user_id}`,
    };
  }
  return await fetch(
    `https://www.codegrepper.com/api/profile.php?id=${user_id}`
  )
    .then((response) => {
      return response.text();
    })
    .then((myJson) => {
      try {
        Data = JSON.parse(myJson);
        if (Data.real_name == null && Data.fun_name == null)
          return {
            Success: false,
            Message: `No Such User Exists`,
          };
        return {
          Success: true,
          location: Data.location,
          real_name: Data.real_name,
          fun_name: Data.fun_name,
          twitter_name: Data.twitter_name,
          donate_link: Data.donate_link,
          how_to_help: Data.how_to_help,
          profile_image: toAvatar(Data.profile_image),
          is_rank_private: intToBool(Data.is_rank_private),
          is_activity_private: intToBool(Data.is_activity_private),
          is_expertise_private: intToBool(Data.is_expertise_private),
          is_daily_activity_private: intToBool(Data.is_daily_activity_private),
        };
      } catch {
        return {
          Success: false,
          Message: `Unable To Fetch Users Information`,
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

module.exports = userInfo;
