const fetch = require("node-fetch");

async function userTopAnswers(user_id) {
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
  return fetch(
    `https://www.codegrepper.com/api/profile_top_answers.php?id=${user_id}`
  )
    .then((response) => {
      return response.text();
    })
    .then((myJson) => {
      let data_array = [];
      try {
        Data = JSON.parse(myJson).top_answers;
        for (i = 0; i < Data.length; i++) {
          CA = Data[i];
          data_array.push({
            Id: CA.id,
            Term: CA.search_term,
            Score: CA.score,
            Answer: CA.answer,
            Created: CA.created_at,
            Results: CA.total_results,
            Upvotes: CA.upvotes,
            Upvotes: CA.downvotes,
          });
        }
        return {
          Success: true,
          Data: data_array,
        };
      } catch {
        return {
          Success: false,
          Message: `Unable To Fetch Users Top Answers`,
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

module.exports = userTopAnswers;
