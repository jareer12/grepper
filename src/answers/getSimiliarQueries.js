const fetch = require('node-fetch');
const chalk = require("chalk");

async function getSimiliarQueries(query, toLog) {
    if (!query || query == null || query == undefined) {
        if (toLog == true) {
            console.log(chalk.red(`No Answer Query Provided`))
        }
        return {
            Success: false,
            Message: `No Answer Query Provided`
        }
    }
    if (typeof query !== 'string') {
        if (toLog == true) {
            console.log(chalk.red(`Query must be a string, got ${typeof query}(${query})`))
        }
        return {
            Success: false,
            Message: `Query must be a string, got ${typeof query}`
        }
    }
    return await fetch(`https://www.codegrepper.com/api/search_term_alternatives.php?q=${query}`)
        .then((response) => {
            return response.text();
        })
        .then((myJson) => {
            try {
                data_array = []
                Data = JSON.parse(myJson)
                for (i = 0; i < Data.related_terms.length; i++) {
                    if (i >= 10) break;
                    CA = Data.related_terms[i];
                    data_array.push({
                        Term: CA.term,
                        Score: CA.score
                    })
                }
                if (toLog == true) { console.log(chalk.green(`Fetched ${Data.related_terms.length} Similiar Queries`)) }
                return {
                    Success: true,
                    Total: Data.related_terms.length,
                    Data: data_array
                };
            } catch {
                if (toLog == true) { console.log(chalk.red(`Unable To Fetch Search Results`)) }
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

module.exports = getSimiliarQueries;