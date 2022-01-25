const GREPPER = require("./index");
/* 
  Testing Account
  Username: ruiweghuvfwbfiwyfbsdosnuc@wuif.com
  Passsword: ruiweghuvfwbfiwyfbsdosnuc@wuif.com
*/

async function __main__() {
  const Account = await GREPPER.Signup({
    email: "Kid@gmail.com", // Account Email
    password: "Ez", // Account Password
  });
  console.log(Account);
}
__main__();

json = {
  data: [
    {
      Id: 551900,
      Username: "kind-kangaroo-76kmxlwy3ctn",
      DisplayName: "Kind Kangaroo",
      BeltPercentage: "no",
      Avatar:
        "https://www.codegrepper.com/profile_images/50_50/default_profile.png",
    },
  ],
};

register = {
  Success: true,
  Message: "Successfuly Registered New Account.",
  Data: {
    errors: [],
    success: true,
    access_token: "",
    user_id: 1,
    email: "string",
    hide_grepper_button: null,
    grepper_user_langs: [
      {
        lkey: "abap",
        name: "Abap",
        enabled: 0,
      },
    ],
    blacklists: [],
  },
};
