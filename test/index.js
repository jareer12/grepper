const GREPPER = require("../src/index.js")

async function __main__() {
    Data = await GREPPER.enableCommentNotif(123)
    console.log(Data)
} __main__()