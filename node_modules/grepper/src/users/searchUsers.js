const fetch = require('node-fetch');
const chalk = require("chalk");
const { toAvatar } = require("../misc/misc")

async function searchUsers(user_name, toLog) {
    if (toLog == true) {
        console.log(chalk.red(`No Username Query Provided`))
    }
    if (!user_name || user_name == null || user_name == undefined) {
        return {
            Success: false,
            Message: `No Username Query Provided`
        }
    }
    return fetch(`https://www.codegrepper.com/api/autocomplete_users_search.php?q=${encodeURI(user_name)}`)
        .then((response) => {
            return response.text();
        })
        .then((myJson) => {
            try {
                data_array = []
                Data = JSON.parse(myJson)
                for (i = 0; i < Data.length; i++) {
                    data_array.push({
                        Id: Data[i].id,
                        Username: Data[i].real_name,
                        DisplayName: Data[i].fun_name,
                        Avatar: toAvatar(Data[i].profile_image)
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
                    Message: `Unable To Fetch Search Results`
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

module.exports = searchUsers;