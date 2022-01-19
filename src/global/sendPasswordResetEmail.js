const fetch = require('node-fetch');
const chalk = require("chalk");
const { isEmail } = require("../misc/misc");
const FormData = require('form-data');

async function sendPasswordResetEmail(email, toLog) {
    if (!isEmail(email)) {
        if (toLog == true) {
            console.log(chalk.red(`Provided Email Is Not Valid`))
        }
        return {
            Success: false,
            Message: `Provided Email Is Not Valid`
        }
    }
    if (!email) {
        if (toLog == true) {
            console.log(chalk.red(`No Email Provided`))
        }
        return {
            Success: false,
            Message: `No Email Provided`
        }
    }
    if (typeof email !== 'string') {
        if (toLog == true) {
            console.log(chalk.red(`PHPSESSID must be a string, got ${typeof email}(${email})`))
        }
        return {
            Success: false,
            Message: `PHPSESSID must be a string, got ${typeof email}`
        }
    }
    DataToSend = new FormData();
    DataToSend.append("email", email)
    return new Promise((res, rej) => {
        return fetch(`https://www.codegrepper.com/api/reset_password.php`, {
            "method": "POST",
            "body": DataToSend
        })
            .then((response) => {
                return response.text();
            })
            .then((myJson) => {
                try {
                    Data = JSON.parse(myJson)
                    if (Data.success) {
                        res({ Success: true, Message: `Password Reset Email Has Been Sent` })
                    } else {
                        rej({ Success: false, Message: Data.errors[0] || "Unknown Error" })
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

module.exports = sendPasswordResetEmail;