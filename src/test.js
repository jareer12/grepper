const GREPPER = require("./index")

async function __main__() {
    Data = await GREPPER.getPrivacySettings("", true);
    console.log(Data)
} __main__()