const fetch = require('node-fetch');
const chalk = require("chalk");
const {
    isEmail
} = require("../misc/misc");
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

    const DataToSend = new FormData();
    DataToSend.append("email", email)
    return fetch(`https://www.codegrepper.com/api/account_privacy.php`, {
        "method": "POST",
        "body": DataToSend,
    })
        .then((response) => {
            return response.text();
        })
        .then((myJson) => {
            try {
                Data = JSON.parse(myJson)
                if (Data.success) {
                    return {
                        Success: true,
                        Message: `Password Reset Email Has Been Sent`
                    }
                } else {
                    return {
                        Success: false,
                        Message: Data.errors[0] || "Unknown Error"
                    }
                }
            } catch {
                return {
                    Success: false,
                    Message: `Couldn't fetch data, server may be down temporarily`
                }
            }
        }).catch(err => {
            if (!toLog == true) {
                console.log(chalk.red(`An Unknown Error Occured`));
            } else {
                console.log(chalk.red(err))
            }
            return {
                Success: false,
                Message: err
            }
        })
}

module.exports = sendPasswordResetEmail;