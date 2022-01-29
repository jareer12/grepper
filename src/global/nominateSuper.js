const fetch = require("node-fetch");
const FormData = require("form-data");

async function nominateSuper(data) {
  const super_badges = {
    most_helpful: {
      award_id: 1,
    },
    hard_worker: {
      award_id: 2,
    },
    class_clown: {
      award_id: 3,
    },
    best_smile: {
      award_id: 4,
    },
    most_likely_billion: {
      award_id: 5,
    },
    best_hair: {
      award_id: 6,
    },
    most_intelligent: {
      award_id: 7,
    },
    best_coder: {
      award_id: 8,
    },
    most_attractive: {
      award_id: 9,
    },
    most_creative: {
      award_id: 10,
    },
  };

  const token = data.token;
  const userId = data.userId;
  if (!super_badges[data.awardName]) {
    return {
      Success: false,
      Message: `No Such Award Exists`,
    };
  }
  const DataToSend = new FormData();
  DataToSend.append("award", 1);
  DataToSend.append("user_id", data.nomineeId);
  DataToSend.append("award_id", super_badges[data.awardName].award_id);
  return fetch(`https://www.codegrepper.com/api/nominate_super.php`, {
    method: "POST",
    body: DataToSend,
    headers: {
      "x-auth-token": token,
      "x-auth-id": userId,
    },
  })
    .then((response) => {
      return response.text();
    })
    .then((results) => {
      try {
        if (results == "1") {
          return {
            Success: true,
            Message: `Successfuly Nominated`,
          };
        } else {
          return {
            Success: false,
            Message: `Unable To Nominate`,
            Error: results,
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

module.exports = nominateSuper;
