const fetch = require('node-fetch');
const chalk = require("chalk");

async function searchUsers(user_name, toLog) {
    return fetch(`https://www.codegrepper.com/api/autocomplete_users_search.php?q=${user_name}`)
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
                        Avatar: `https://www.codegrepper.com/profile_images/${Data[i].profile_image}`
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
            if (!toLog == true) { console.log(chalk.red(`An Unknown Error Occured`)); return; }
            console.log(chalk.red(err))
            return {
                Success: false,
                Message: err
            }
        })
}

module.exports = searchUsers;