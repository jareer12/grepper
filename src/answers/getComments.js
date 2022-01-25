const fetch = require("node-fetch");

async function getComments(answer_id) {
  if (!answer_id || answer_id == null || answer_id == undefined) {
    return {
      Success: false,
      Message: `No UserId Query Provided`,
    };
  }
  if (typeof answer_id !== "number") {
    return {
      Success: false,
      Message: `PHPSESSID must be a number, got ${typeof answer_id}`,
    };
  }
  return await fetch(
    `https://www.codegrepper.com/api/get_answers_comments.php?aid=${answer_id}`
  )
    .then((response) => {
      return response.text();
    })
    .then((myJson) => {
      try {
        data_array = [];
        Data = JSON.parse(myJson);
        for (i = 0; i < Data.comments.length; i++) {
          if (i >= 10) break;
          CC = Data.comments[i];
          data_array.push({
            Id: CC.id,
            Comment: CC.comment,
            Created: CC.created_at,
            Upvotes: CC.t_upvotes,
            Downvotes: CC.t_upvotes,
            Owner: {
              Id: CC.user_id,
              Username: CC.profile_slug,
              DisplayName: CC.fun_name,
            },
          });
        }
        return {
          Success: true,
          Total: Data.comments.length,
          Data: data_array,
        };
      } catch {
        return {
          Success: false,
          Message: `Unable To Fetch Search Results`,
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

module.exports = getComments;
