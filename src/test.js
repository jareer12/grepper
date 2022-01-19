const GREPPER = require("./index")

async function __main__() {
    Data = await GREPPER.sendPasswordResetEmail("jforeverything2007@gmail.com", true);
    console.log(Data)
} __main__()