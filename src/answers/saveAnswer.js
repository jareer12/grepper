const fetch = require("node-fetch");
const { boolToInt } = require("../misc/misc");

async function saveAnswer(Data) {
  const token = Data.token;
  const answer = Data.answer;
  const query = Data.query;
  const userId = Data.userId;
  const langauge = Data.langauge || "whatever";
  const sourceURL = Data.sourceURL || "";
  const teamIds = Data.teamIds || [];
  const isPrivate = boolToInt(Data.isPrivate || 0);

  return fetch(`https://www.codegrepper.com/api/save_answer.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
      "x-auth-id": userId,
    },
    body: JSON.stringify({
      answer: answer,
      user_id: userId,
      team_ids: teamIds,
      language: langauge,
      is_private: isPrivate,
      source_url: sourceURL,
      codeSearch: {
        results: [],
        search: query,
      },
    }),
  })
    .then((response) => {
      if (response.status !== 200) {
        return {
          Success: false,
          Message: `Server Returned an invalid response.`,
        };
      }
      return response.text();
    })
    .then((myJson) => {
      try {
        Data = JSON.parse(myJson);
        if (Data.success) {
          return {
            Success: true,
            Message: `Answer Successfuly Saved`,
            Data: {
              URL: `https://www.google.com/search?q=${encodeURI(query)}`,
            },
          };
        } else {
          if (Data.duplicate_answer == 1) {
            return {
              Success: false,
              Message: `Duplicate answer submitted.`,
            };
          }
          return {
            Success: false,
            Message: `An error occured`,
            Error: JSON.parse(myJson) || myJson,
          };
        }
      } catch {
        return {
          Success: false,
          Message: `Could not Parse Server response`,
          Error: myJson,
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

module.exports = saveAnswer;
