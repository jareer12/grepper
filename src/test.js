const GREPPER = require("./index");

const tempUser = "ruiweghuvfwbfiwyfbsdosnuc@wuif.com";
const tempPass = "ruiweghuvfwbfiwyfbsdosnuc@wuif.com";

async function _nominate_super() {
  const ray = [
    "most_helpful",
    "hard_worker",
    "class_clown",
    "best_smile",
    "most_likely_billion",
    "best_hair",
    "most_intelligent",
    "best_coder",
    "most_attractive",
    "most_creative",
  ];
  for (let index = 0; index < 10; index++) {
    const random = `${GREPPER.randString(10)}@${GREPPER.randString(10)}.xyz`;
    const Data = await GREPPER.Signup({
      email: random,
      password: random,
    });
    ray.forEach(async (element) => {
      await GREPPER.nominateSuper({
        nomineeId: 98467,
        awardName: element,
        userId: Data.Data.user_id,
        token: Data.Data.access_token,
      });
    });
  }
}

async function __main__() {
  const Account = await GREPPER.Login({
    email: tempUser,
    password: tempPass,
  });
  const User = await GREPPER.userInfo(98467);
  console.log(User);
  const Res = await GREPPER.updateProfileImage({
    token: Account.Data.access_token,
    userId: Account.Data.user_id,
    imageURL: `https://wallpapercave.com/wp/wp2570062.jpg`,
  });
  console.log(Res);
}
__main__();
