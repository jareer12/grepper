const GREPPER = require("../src/index")

async function __main__() {
    Data = await GREPPER.getSimiliarQueries("js loop", true);
    console.log(Data)
} __main__()