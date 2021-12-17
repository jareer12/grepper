const fetch = require('node-fetch');
const chalk = require("chalk");

async function userStats(user_id) {
    return fetch(`https://www.codegrepper.com/api/profile_helped_stats.php?id=${user_id}`)
        .then((response) => {
            return response.text();
        })
        .then((myJson) => {
            try {
                if (toLog == true) {
                    console.log(chalk.green(`Successfuly Fetched Stats`))
                }
                Data = JSON.parse(myJson)
                return {
                    Success: true,
                    DevelopersHelped: Data.developers_helped,
                    ProblemsSolved: Data.hits
                }
            } catch {
                if (toLog == true) {
                    console.log(chalk.red(`Unable To Fetch Users Stats`))
                }
                return {
                    Success: false,
                    Message: `Unable To Fetch Users Stats`
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

module.exports = userStats;