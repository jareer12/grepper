const GREPPER = require("./index");

const tempUser = "ruiweghuvfwbfiwyfbsdosnuc@wuif.com";
const tempPass = "ruiweghuvfwbfiwyfbsdosnuc@wuif.com";

async function __main__() {
  const Data = await GREPPER.Login({
    email: tempUser,
    password: tempPass,
  });
  const Account = await GREPPER.Login({
    token: Data.access_token,
    userId: Data.user_id,
  });
  console.log(Account);
}
__main__();
