const fetch = require('node-fetch');
const chalk = require("chalk");

async function userTopAnswers(user_id, toLog) {
    return fetch(`https://www.codegrepper.com/api/profile_top_answers.php?id=${user_id}`)
        .then((response) => {
            return response.text();
        })
        .then((myJson) => {
            let data_array = [];
            try {
                Data = JSON.parse(myJson).top_answers
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
                        Upvotes: CA.downvotes
                    })
                }
                return {
                    Success: true,
                    Data: data_array
                }
            } catch {
                return {
                    Success: false,
                    Message: `Unable To Fetch Users Top Answers`
                }
            }
        }).catch(err => {
            if (!toLog == true) { console.log(chalk.red(`An Unknown Error Occured`)); return; }
            console.log(chalk.red(err))
            return {
                Success: false,
                Message: err
            }
        })
}

module.exports = userTopAnswers;