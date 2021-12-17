const fetch = require('node-fetch');

async function userStats(query) {
    return fetch(`https://www.codegrepper.com/api/get_answers_1.php?v=3&s=${query}`)
        .then((response) => {
            return response.text();
        })
        .then((myJson) => {
            try {
                data_array = []
                Data = JSON.parse(myJson)
                for (i = 0; i < Data.more_answers.length; i++) {
                    CA = Data.more_answers[i];
                    data_array.push({
                        Id: CA.id,
                        SearchId: CA.search_id,
                        Owner: {
                            Id: CA.user_id,
                            Username: CA.profile_slug,
                            DisplayName: CA.fun_name,
                            DonateLink: CA.donate_link
                        },
                        Answer: {
                            Term: CA.term,
                            Score: CA.t_score,
                            Language: CA.language,
                            Answers: CA.answers,
                            Created: CA.created_at,
                            Upvotes: CA.t_upvotes,
                            Downvotes: CA.t_downvotes,
                            Copies: CA.t_copies,
                            Results: CA.t_total_results,
                            isPrivate: intToBool(CA.is_private)
                        },
                        Team: {
                            Id: CA.team_id,
                            Name: CA.team_name,
                            isMine: intToBool(CA.is_my_team),
                            Avatar: `https://www.codegrepper.com/team_images/${CA.team_profile_image}`
                        }
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
            if (!toLog == true) { console.log(chalk.red(`An Unknown Error Occured`)) }
            console.log(chalk.red(err))
            return {
                Success: false,
                Message: err
            }
        })
}

module.exports = userStats;