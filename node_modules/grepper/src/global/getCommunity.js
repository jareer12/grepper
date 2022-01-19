const fetch = require('node-fetch');
const chalk = require("chalk");
const { toAvatar } = require("../misc/misc")

async function getCommunity(cookie, limit, toLog) {
    if (!cookie || cookie == null || cookie == undefined) {
        if (toLog == true) {
            console.log(chalk.red(`No Cookie Provided`))
        }
        return {
            Success: false,
            Message: `No Cookie Provided`
        }
    }
    if (typeof cookie !== 'string') {
        if (toLog == true) {
            console.log(chalk.red(`PHPSESSID must be a string, got ${typeof cookie}(${cookie})`))
        }
        return {
            Success: false,
            Message: `PHPSESSID must be a string, got ${typeof cookie}`
        }
    }
    if (!limit) {
        limit = 50;
        if (toLog == true) { console.log(chalk.green(`A Valid Limit Was not Provided, Limit must be an Integer`)) }
    }
    if (limit >= 500) return { Success: false, Message: `Community Users Maximum Limit is 500` }
    return fetch(`https://www.codegrepper.com/api/get_belt_users.php?offset=0&limit=${limit}`, {
        headers: {
            cookie: `PHPSESSID=${cookie}`
        }
    })
        .then((response) => {
            return response.text();
        })
        .then((myJson) => {
            try {
                data_array = []
                Data = JSON.parse(myJson).users
                if (Data.length <= 0) {
                    if (toLog == true) {
                        console.log(chalk.red(`No Data Found`))
                    }
                    return {
                        Message: `No Data Found`
                    }
                }
                for (i = 0; i < Data.length; i++) {
                    CU = Data[i];
                    data_array.push({
                        Id: CU.user_id,
                        Username: CU.profile_slug,
                        DisplayName: CU.fun_name,
                        Avatar: toAvatar(CU.profile_image)
                    })
                }
                return {
                    Success: true,
                    Total: Data.length,
                    Data: data_array
                };
            } catch {
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