const fetch = require('node-fetch');
const chalk = require("chalk");
const { intToBool } = require("../misc/misc")

async function userByCookie(cookie, toLog) {
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
    return fetch(`https://www.codegrepper.com/api/account.php`, {
        headers: {
            cookie: `PHPSESSID=${cookie}`
        }
    })
        .then((response) => {
            return response.text();
        })
        .then((myJson) => {
            try {
                Data = JSON.parse(myJson);
                if (Data) {
                    return {
                        Success: true,
                        Name: Data.fun_name,
                        DonateLink: Data.donate_link,
                        CommentNotif: intToBool(Data.notify_on_comments)
                    }
                } else {
                    return {
                        Success: false,
                        Message: `User Fun Name Not Found`
                    }
                }
            } catch {
                return {
                    Success: false,
                    Message: `Couldn't Fetch Username`
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

module.exports = userByCookie;