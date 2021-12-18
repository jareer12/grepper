const fetch = require('node-fetch');
const chalk = require("chalk");
const { toAvatar, intToBool } = require("../misc/misc")

async function userInfo(user_id, toLog) {
    return await fetch(`https://www.codegrepper.com/api/profile.php?id=${user_id}`)
        .then((response) => {
            return response.text();
        })
        .then((myJson) => {
            try {
                Data = JSON.parse(myJson)
                if (Data.real_name == null && Data.fun_name == null) return {
                    Success: false,
                    Message: `No Such User Exists`
                }
                return {
                    Success: true,
                    Location: Data.location,
                    Username: Data.real_name,
                    DisplayName: Data.fun_name,
                    Twitter: Data.twitter_name,
                    DonateLink: Data.donate_link,
                    HowToHelp: Data.how_to_help,
                    Avatar: toAvatar(Data.profile_image),
                    isRankPrivate: intToBool(Data.is_rank_private),
                    isActivityPrivate: intToBool(Data.is_activity_private),
                    isExpertisePrivate: intToBool(Data.is_expertise_private),
                    isDailyActivityPrivate: intToBool(Data.is_daily_activity_private)
                };
            } catch {
                return {
                    Success: false,
                    Message: `Unable To Fetch Users Information`
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

module.exports = userInfo;