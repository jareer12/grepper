const fetch = require('node-fetch');
const chalk = require("chalk");

async function enableCommentNotif(cookie, toLog) {
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
    return fetch(`https://www.codegrepper.com/api/update_notification_settings.php`, {
        "method": "POST",
        "headers": {
            'Content-Type': 'application/json',
            "credentials": 'include',
            "cookie": `PHPSESSID=${cookie}`
        },
        "body": JSON.stringify({
            update_name: "notify_on_comments",
            update_value: 0
        })
    })
        .then((response) => {
            if (response.status !== 200) {
                if (toLog == true) {
                    console.log(chalk.red(`Unable To Enable Comment Notifications`))
                }
                return {
                    Success: false,
                    Message: `Unable To Enable Comment Notifications`
                }
            }
            return response.text();
        })
        .then((myJson) => {
            if (myJson == "") {
                if (toLog == true) {
                    console.log(chalk.green(`Successfuly Enabled Comment Notifications`))
                }
                return {
                    Success: true,
                    Message: `Successfuly Enabled Comment Notifications`
                }
            } else {
                try {
                    Data = JSON.parse(myJson);
                    if (myJson.success) {
                        if (myJson.success == false && myJson.reason == "Unauthorized") {
                            if (toLog == true) {
                                console.log(chalk.red(`Unauthorized, Cookie is not valid`))
                            }
                            return {
                                Success: false,
                                Message: `Unauthorized, Cookie is not valid`
                            }
                        }
                    }
                } catch {
                    if (response.status !== 200) {
                        if (toLog == true) {
                            console.log(chalk.red(`Unable To Enable Comment Notifications`))
                        }
                        return {
                            Success: false,
                            Message: `Unable To Enable Comment Notifications`
                        }
                    }
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

module.exports = enableCommentNotif;