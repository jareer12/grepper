const fetch = require('node-fetch');
const chalk = require("chalk");

async function checkCookie(cookie, toLog) {
    if (!cookie) {
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
    return new Promise((res, rej) => {
        return fetch(`https://www.codegrepper.com/api/get_belt_users.php?offset=0&limit=1`, {
            credentials: 'include',
            headers: {
                cookie: `PHPSESSID=${cookie}`
            }
        })
            .then((response) => {
                return response.text();
            })
            .then((myJson) => {
                try {
                    Data = JSON.parse(myJson)
                    if (Data.success) {
                        if (Data.success == false && Data.reason == "Unauthorized") {
                            rej({ Success: false, Message: `Invalid Cookie Provided` })
                        } else if (Data.success == false) {
                            rej({ Success: false, Message: `Invalid Cookie Provided` })
                        }
                    }
                    if (Data.users) {
                        res({ Success: true, Message: `Cookie ${cookie} is Valid`, Cookie: cookie })
                    }
                } catch {
                    rej({ Success: false, Message: `Couldn't fetch data, server may be down temporarily` })
                }
            }).catch(err => {
                if (!toLog == true) { console.log(chalk.red(`An Unknown Error Occured`)); } else {
                    console.log(chalk.red(err))
                }
                rej({
                    Success: false,
                    Message: err
                })
            })
    })
}

module.exports = checkCookie;