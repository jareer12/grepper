const GREPPER = require("./index")

async function __main__() {
    Data = await GREPPER.getPrivacySettings("618fn9ln6bmvhsmct8ri9lp4l5", true);
    console.log(Data)
} __main__()