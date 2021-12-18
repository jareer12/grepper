const chalk = require('chalk');
const fetch = require('node-fetch');
const { intToBool } = require("../misc/misc")

async function userBeltStats(user_id, toLog) {
    return fetch(`https://www.codegrepper.com/api/get_user_stats.php?uid=${user_id}`)
        .then((response) => {
            return response.text();
        })
        .then((myJson) => {
            if (myJson == "Unauthorized") return {
                Success: false,
                Message: `Belt is Set to Private`
            }
            try {
                Data = JSON.parse(myJson);
                return {
                    Success: true,
                    isPrivate: intToBool(Data.is_rank_private),
                    Percentage: Data.coding_belt[2],
                    NextBelt: Data.coding_belt[2],
                    CurrentBelt: Data.coding_belt[0],
                }
            } catch {
                if (toLog == true) { console.log(chalk.red(`Unable To Fetch User Data`)) }
                return {
                    Success: false,
                    Message: `Unable To Fetch User Data`
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

module.exports = userBeltStats;