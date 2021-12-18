const fetch = require('node-fetch');
const chalk = require("chalk");
const { toAvatar } = require("../misc/misc")

async function getCommunity(cookie, toLog) {
    return fetch(`https://www.codegrepper.com/api/get_who_to_follow.php`, {
        headers: {
            cookie: `PHPSESSID=${cookie}`
        }
    })
        .then((response) => {
            return response.text();
        })
        .then((myJson) => {
            if (myJson.success) {
                if (myJson.success == false && myJson.reason == "Unauthorized") {
                    if (toLog == true) {
                        console.log(chalk.red(`Unauthorized, Provided Cookie is invalid`))
                    }
                    return {
                        Success: false,
                        Message: `Unauthorized, Provided Cookie is invalid`
                    }
                }
            }
            try {
                data_array = []
                Data = JSON.parse(myJson).users
                for (i = 0; i < Data.length; i++) {
                    CU = Data[i];
                    data_array.push({
                        Id: CU.user_id,
                        Username: CU.profile_slug,
                        DisplayName: CU.fun_name,
                        BeltPercentage: CU.belt_rank,
                        Avatar: toAvatar(CU.profile_image),
                    })
                }
                if (toLog == true) {
                    console.log(chalk.green(`Fetched ${Data.length} Rows of Data`))
                }
                return {
                    Success: true,
                    Total: Data.length,
                    Data: data_array
                };
            } catch {
                if (toLog == true) {
                    console.log(chalk.red(`Unable To Fetch Grepper Community`))
                }
                return {
                    Success: false,
                    Message: `Unable To Fetch Grepper Community`
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

module.exports = getCommunity;