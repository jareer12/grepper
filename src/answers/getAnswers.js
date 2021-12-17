const fetch = require('node-fetch');
const chalk = require("chalk");
const { intToBool } = require("../misc/misc")

async function getAnswers(query, toLog) {
    return await fetch(`https://www.codegrepper.com/api/get_answers_1.php?v=3&s=${encodeURI(query)}`)
        .then((response) => {
            return response.text();
        })
        .then((myJson) => {
            try {
                data_array = []
                Data = JSON.parse(myJson)
                for (i = 0; i < Data.more_answers.length; i++) {
                    if (i >= 10) break;
                    CA = Data.more_answers[i];
                    data_array.push({
                        Id: CA.id,
                        SearchId: CA.search_id,
                        Owner: {
                            Id: CA.user_id,
                            Username: CA.profile_slug,
                            DisplayName: CA.fun_name,
                            DonateLink: CA.donate_link
                        },
                        Answer: {
                            Term: CA.term,
                            Score: CA.t_score,
                            Language: CA.language,
                            Answers: CA.answers,
                            Created: CA.created_at,
                            Upvotes: CA.t_upvotes,
                            Downvotes: CA.t_downvotes,
                            Copies: CA.t_copies,
                            Results: CA.t_total_results,
                            isPrivate: intToBool(CA.is_private)
                        },
                        Team: {
                            Id: CA.team_id,
                            Name: CA.team_name,
                            isMine: intToBool(CA.is_my_team),
                            Avatar: `https://www.codegrepper.com/team_images/${CA.team_profile_image}`
                        }
                    })
                }
                if (toLog == true) { console.log(chalk.green(`Fetched ${Data.more_answers.length} Answer Results`)) }
                return {
                    Success: true,
                    Total: Data.more_answers.length,
                    Data: data_array
                };
            } catch {
                if (toLog == true) { console.log(chalk.red(`Unable To Fetch Search Results`)) }
                return {
                    Success: false,
                    Message: `Unable To Fetch Search Results`
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

module.exports = getAnswers;