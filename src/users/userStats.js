const fetch = require('node-fetch');
const chalk = require("chalk");

async function userStats(user_id, toLog) {
    if (!user_id || user_id == null || user_id == undefined) {
        if (toLog == true) {
            console.log(chalk.red(`No UserId Query Provided`))
        }
        return {
            Success: false,
            Message: `No UserId Query Provided`
        }
    }
    if (typeof user_id !== 'number') {
        if (toLog == true) {
            console.log(chalk.red(`PHPSESSID must be a number, got ${typeof user_id}(${v})`))
        }
        return {
            Success: false,
            Message: `PHPSESSID must be a number, got ${typeof user_id}`
        }
    }
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
            if (!toLog == true) { console.log(chalk.red(`An Unknown Error Occured`)); } else {
                console.log(chalk.red(err))
            }
            return {
                Success: false,
                Message: err
            }
        })
}

module.exports = userStats;