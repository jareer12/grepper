const GREPPER = require("./index");

const tempUser = "ruiweghuvfwbfiwyfbsdosnuc@wuif.com";
const tempPass = "ruiweghuvfwbfiwyfbsdosnuc@wuif.com";

async function __main__() {
  const Data = await GREPPER.Login({
    email: tempUser,
    password: tempPass,
  });
  console.log(Data);
  const Account = await GREPPER.nominateSuper({
    nomineeId: 98467,
    awardName: "best_coder",
    userId: Data.Data.user_id,
    token: Data.Data.access_token,
  });
  console.log(Account);
}
__main__();
