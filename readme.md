# GREPPER [![Overall Downloads](https://img.shields.io/npm/v/grepper)](https://www.npmjs.com/package/grepper)

```shell
yarn add grepper
```

```shell
npm install grepper
```

```js
const GREPPER = require("grepper");
```

## Quick Guide

- [Global Functions](https://github.com/jareer12/grepper#global)
- [User Related Functions](https://github.com/jareer12/grepper#users)
- [Answer Related Functions](https://github.com/jareer12/grepper#answers)
- [Settings Related Functions](https://github.com/jareer12/grepper#settings)
- **[Raw API Documentation](https://github.com/jareer12/code-grepper)**

## [Global][globaldocs]

### `checkToken()`

To check if a token is valid use this function. The first parameter is the [ACCESS_TOKEN][].

```js
async function __main__() {
  GREPPER.checkToken("YOUR_ACCESS_TOKEN_HERE")
    .then((res) => {
      // Your Code Goes Here
    })
    .catch((err) => {
      console.log(err);
    });
}
__main__();
```

### `Login()`

Login with username & password.

```js
async function __main__() {
  const Account = await GREPPER.Login({
    email: process.env.EMAIL, // Your Account Email
    password: process.env.PASSWORD, // Your Account Password
  });
  console.log(Account);
}
__main__();
```

```json
{
  "errors": [],
  "success": true,
  "access_token": "",
  "user_id": 0,
  "email": "",
  "hide_grepper_button": 0,
  "grepper_user_langs": [
    {
      "lkey": "abap",
      "name": "Abap",
      "enabled": 0
    }
  ],
  "blacklists": []
}
```

### `Signup()`

Signup with username & password.

```js
async function __main__() {
  const Account = await GREPPER.Signup({
    email: process.env.EMAIL, // Account Email
    password: process.env.PASSWORD, // Account Password
  });
  console.log(Account);
}
__main__();
```

```json
{
  "Success": true,
  "Message": "Successfuly Registered New Account.",
  "Data": {
    "errors": [],
    "success": true,
    "access_token": "",
    "user_id": 1,
    "email": "string",
    "hide_grepper_button": null,
    "grepper_user_langs": [
      {
      "lkey": "abap",
      "name": "Abap",
      "enabled": 0
      }
    ],
    "blacklists": [],
  },
};
```

### `getCommunity()`

Function to get codegrepper top users(community) from the community page. The first parameter is the [Token][], The second parameter is limit of users to get(`default: 100`).

```js
async function __main__() {
  Data = await GREPPER.getCommunity("YOUR_ACCESS_TOKEN", 200);
  console.log(Data);
}
__main__();
```

### `sendPasswordResetEmail()`

Sends a reset password email to the provided email address.

```js
async function __main__() {
  Data = await GREPPER.sendPasswordResetEmail("example@example.com");
  console.log(Data);
}
__main__();
```

## [Users][usersdocs]

### `userInfo()`

Fetches code Grepper user's profile information. The first parameter is the `user_id(int)`.

```js
async function __main__() {
  Data = await GREPPER.userInfo(98467);
  console.log(Data);
}
__main__();
```

### `userByToken()`

Fetches code Grepper user's information by their [ACCESS_TOKEN][].

```js
async function __main__() {
  Data = await GREPPER.userByToken("YOUR_ACCESS_TOKEN");
  console.log(`Successfuly Logged in as ${Data.Name}`);
}
__main__();
```

### `userBeltStats()`

Fetches The user's code grepper belt stats. The first parameter is the `user_id(int)`.

```js
async function __main__() {
  Data = await GREPPER.userBeltStats(98467);
  console.log(Data);
}
__main__();
```

### `userStats()`

Fetches The user's code grepper helped and problems solved stats. The first parameter is the `user_id(int)`.

```js
async function __main__() {
  Data = await GREPPER.userStats(98467);
  console.log(Data);
}
__main__();
```

### `userTopAnswers()`

Fetches The user's top code grepper answers. The first parameter is the `user_id(int)`.

```js
async function __main__() {
  Data = await GREPPER.userTopAnswers(98467);
  console.log(Data);
}
__main__();
```

### `searchUsers()`

Searches for code grepper users The first parameter is the `user_name(str)`.

```js
async function __main__() {
  Data = await GREPPER.searchUsers("Jareer");
  console.log(Data);
}
__main__();
```

### `getWhoToFollow()`

This functions gets all the recommended users to follow that you can find on the [feed](https://www.codegrepper.com/app/feed.php) page, first parameter is [ACCESS_TOKEN][].

```js
async function __main__() {
  Data = await GREPPER.getWhoToFollow("YOUR_ACCESS_TOKEN");
  console.log(Data);
}
__main__();
```

## [Answers][answersdocs]

### `getAnswers()`

Fetches coding answers from code grepper, enter the query in the first parameter.

```js
async function __main__() {
  Data = await GREPPER.getAnswers("js loop");
  console.log(Data);
}
__main__();
```

### `getComments()`

Fetches comments from code grepper coding answers, first parameter is `answerId(int)`.

```js
async function __main__() {
  Data = await GREPPER.getComments(23);
  console.log(Data);
}
__main__();
```

### `getSimiliarQueries()`

Fetches similiar queries like the one provided, eg, if you enter `js loop` it will return `javascript loop`, `loop in javascript`, `loop javascript`

```js
async function __main__() {
  Data = await GREPPER.getSimiliarQueries("js loop");
  console.log(Data);
}
__main__();
```

## [Settings][settingsdocs]

### `enableCommentNotif()`

Enables your comment notifications from the settings.

```js
async function __main__() {
  Data = await GREPPER.enableCommentNotif("YOUR_ACCESS_TOKEN");
  console.log(Data);
}
__main__();
```

### `disableCommentNotif()`

Disables your comment notifications from the settings.

```js
async function __main__() {
  Data = await GREPPER.disableCommentNotif("YOUR_ACCESS_TOKEN");
  console.log(Data);
}
__main__();
```

### `getPrivacySettings()`

Gets you privacy settings.

```js
async function __main__() {
  Data = await GREPPER.getPrivacySettings("YOUR_ACCESS_TOKEN");
  console.log(Data); // Data.Data is the actual object with data
}
__main__();
```

## [Example Usage][access_token]

```js
// Fetching Privacy Settings By Username & Password
async function __main__() {
  const Account = await GREPPER.Login({
    email: "ruiweghuvfwbfiwyfbsdosnuc@wuif.com",
    password: "ruiweghuvfwbfiwyfbsdosnuc@wuif.com",
  });
  const Data = await GREPPER.Login({
    token: Account.Data.access_token,
    userId: Account.Data.user_id,
  });
  console.log(Data);
}
__main__();
```

[usersdocs]: https://github.com/jareer12/code-grepper#users
[answersdocs]: https://github.com/jareer12/code-grepper#answers
[settingsdocs]: https://github.com/jareer12/code-grepper#settings
[access_token]: https://github.com/jareer12/code-grepper#dealing-with-authorizations
[globaldocs]: https://github.com/jareer12/code-grepper#codegrepper-api-docsunofficial
