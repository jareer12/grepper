const GREPPER = require("../src/index.js")

async function __main__() {
    Data = await GREPPER.getCommunity("YOUR_PHPSESSID")
    console.log(Data)
} __main__()