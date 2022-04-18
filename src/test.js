const GREPPER = require("./index");

async function __main__() {
  for (let i = 0; i < 5; i++) {
    random = `${GREPPER.randString(10)}@jubot.site`;
    Data = await GREPPER.Signup({
      email: random,
      password: random,
    });
    Super = await GREPPER.nominateSuper({
      token: Data.Data.access_token,
      userId: Data.Data.user_id,
      awardName: "harest_worker",
      nomineeId: 98467,
    });
    console.log(Super.Success);
  }
}

__main__();
