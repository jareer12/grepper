const GREPPER = require("../src/index.js")

async function __main__() {
    GREPPER.checkCookie("oeh461807ruorj8r0n80epuln6", true).then(async function (Data) {
        if (Data.Success == false) { console.log(Data.Message) } // Log the message if error
        Update = await GREPPER.enableCommentNotif(Data.Cookie) // Call the enableCommentNotif fucntion
        console.log(Update) // Log the data from enableCommentNotif function
    }).catch(error => {
        console.log(error) // Log the error if exists
    })
} __main__()