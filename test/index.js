const GREPPER = require("../src/index.js")

async function __main__() {
    Data = await GREPPER.getWhoToFollow("YOUR_PHPSESSID", true)
    console.log(Data)
} __main__()