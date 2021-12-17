const fetch = require('node-fetch');
const chalk = require("chalk");

async function getComments(answer_id, toLog) {
    return await fetch(`https://www.codegrepper.com/api/get_answers_comments.php?aid=${answer_id}`)
        .then((response) => {
            return response.text();
        })
        .then((myJson) => {
            try {
                data_array = []
                Data = JSON.parse(myJson)
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
                            DisplayName: CC.fun_name
                        },
                    })
                }
                if (toLog == true) { console.log(chalk.green(`Fetched ${Data.comments.length} Answer Results`)) }
                return {
                    Success: true,
                    Total: Data.comments.length,
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

module.exports = getComments;