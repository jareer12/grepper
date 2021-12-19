const GREPPER = require("../src/index.js")

async function __main__() {
    Data = await GREPPER.userByCookie("0q463r89vafvl5u17uhirbf7qh", true)
    console.log(`Successfuly Logged in as ${Data.Name}`)
} __main__()