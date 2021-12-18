const GREPPER = require("../src/index.js")

async function __main__() {
    GREPPER.checkCookie("YOUR_PHPSESSID_HERE", true)
        .then(res => {
            /* Cookie is Valid
               Your Code Here  */
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
}
__main__()