const GREPPER = require("./index");

const tempUser = "ruiweghuvfwbfiwyfbsdosnuc@wuif.com";
const tempPass = "ruiweghuvfwbfiwyfbsdosnuc@wuif.com";
ray = [
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
async function __main__() {
  for (let index = 0; index < 10; index++) {
    const random = `${GREPPER.randString(10)}@${GREPPER.randString(10)}.xyz`;
    const Data = await GREPPER.Signup({
      email: random,
      password: random,
    });
    ray.forEach(async (element) => {
      const Account = await GREPPER.nominateSuper({
        nomineeId: 98467,
        awardName: element,
        userId: Data.Data.user_id,
        token: Data.Data.access_token,
      });
    });
  }
}
__main__();
