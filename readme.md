## Installation

```shell
npm install grepper
```
```shell
yarn add grepper
```
```js
const GREPPER = require("grepper")
```
![Overall Downloads](https://img.shields.io/discord/905186462486646814)
![Overall Downloads](https://img.shields.io/npm/dt/grepper)
![Overall Downloads](https://img.shields.io/npm/v/grepper)
![Overall Downloads](https://img.shields.io/npm/l/grepper)

## Quick Guide
   * [User Related Functions](https://github.com/jareer12/grepper#users)
   * [Answer Related Functions](https://github.com/jareer12/grepper#answers)
   * [Settings Related Functions](https://github.com/jareer12/grepper#settings)
   * [Global Functions](https://github.com/jareer12/grepper#global)
   * [Raw API Documentation](https://github.com/jareer12/code-grepper)

**What is ToLog?**<br>
The last parameter of every function is a boolean called `toLog`, which allows you to debug things by loging them to console for better understanding of the function you are using, It logs important stuff like responses, errors, etc.

## [Global][GlobalDocs]

### `checkCookie()`

To check if a cookie is valid use this function. The first parameter is the [PHPSESSID][].

```js
async function __main__() {
    GREPPER.checkCookie("YOUR_PHPSESSID_HERE", true)
        .then(res => {
            // Your Code Goes Here
        }).catch(err => {
            console.log(err)
        })
}
__main__()
```

### `getCommunity()`

Function to get codegrepper top users(community) from the community page. The first parameter is the [PHPSESSID][], The second parameter is limit of users to get(`default: 100`).

```js
async function __main__() {
    Data = await GREPPER.getCommunity("YOUR_PHPSESSID", 10, true)
    console.log(Data)
} __main__()
```

## [Users][UsersDocs]

### `userInfo()`

Fetches code Grepper user's profile information. The first parameter is the `user_id(int)`.

```js
async function __main__() {
    Data = await GREPPER.userInfo(98467, true)
    console.log(Data)
} __main__()
```

### `userByCookie()`

Fetches code Grepper user's information by their [PHPSESSID][].

```js
async function __main__() {
    Data = await GREPPER.userByCookie("YOUR_PHPSESSID", true)
    console.log(`Successfuly Logged in as ${Data.Name}`)
} __main__()
```

### `userBeltStats()`

Fetches The user's code grepper belt stats. The first parameter is the `user_id(int)`.

```js
async function __main__() {
    Data = await GREPPER.userBeltStats(98467, true)
    console.log(Data)
} __main__()
```

### `userStats()`

Fetches The user's code grepper helped and problems solved stats. The first parameter is the `user_id(int)`.

```js
async function __main__() {
    Data = await GREPPER.userStats(98467, true)
    console.log(Data)
} __main__()
```

### `userTopAnswers()`

Fetches The user's top code grepper answers. The first parameter is the `user_id(int)`.

```js
async function __main__() {
    Data = await GREPPER.userTopAnswers(98467, true)
    console.log(Data)
} __main__()
```

### `searchUsers()`

Searches for code grepper users The first parameter is the `user_name(str)`.

```js
async function __main__() {
    Data = await GREPPER.searchUsers("Jareer", true)
    console.log(Data)
} __main__()
```

### `getWhoToFollow()`

This functions gets all the recommended users to follow that you can find on the [feed](https://www.codegrepper.com/app/feed.php) page, first parameter is [PHPSESSID][].

```js
async function __main__() {
    Data = await GREPPER.getWhoToFollow("YOUR_PHPSESSID", true)
    console.log(Data)
} __main__()
```

## [Answers][AnswersDocs]

### `getAnswers()`

Fetches coding answers from code grepper, enter the query in the first parameter.

```js
async function __main__() {
    Data = await GREPPER.getAnswers("js loop", true)
    console.log(Data)
} __main__()
```

### `getComments()`

Fetches comments from code grepper coding answers, first parameter is `answerId(int)`.

```js
async function __main__() {
    Data = await GREPPER.getComments(23, true)
    console.log(Data)
} __main__()
```

### `getSimiliarQueries()`

Fetches similiar queries like the one provided, eg, if you enter `js loop` it will return `javascript loop`, `loop in javascript`, `loop javascript`

```js
async function __main__() {
    Data = await GREPPER.getSimiliarQueries("js loop", true)
    console.log(Data)
} __main__()
```
## [Settings][SettingsDocs]

### `enableCommentNotif()`

Enables your comment notifications from the settings.

```js
async function __main__() {
    Data = await GREPPER.enableCommentNotif("YOUR_PHPSESSID", true)
    console.log(Data)
} __main__()
```

### `disableCommentNotif()`

Disables your comment notifications from the settings.

```js
async function __main__() {
    Data = await GREPPER.disableCommentNotif("YOUR_PHPSESSID", true)
    console.log(Data)
} __main__()
```

## [Smart Usage][PHPSESSID]

The best way to use functions that use authorizations is to check the cookie before using. Example given below.

```js
async function __main__() {
    GREPPER.checkCookie("YOUR_PHPSESSID", true).then(async function (Data) {
        Update = await GREPPER.enableCommentNotif(Data.Cookie) // Call the function with the valid Cookie
        console.log(Update) // Log the data from enableCommentNotif function
    }).catch(error => {
        console.log(error) // Log the error if exists
    })
} __main__()
```

[UsersDocs]: https://github.com/jareer12/code-grepper#users
[AnswersDocs]: https://github.com/jareer12/code-grepper#answers
[SettingsDocs]: https://github.com/jareer12/code-grepper#settings
[PHPSESSID]: https://github.com/jareer12/code-grepper#dealing-with-authorizations
[GlobalDocs]: https://github.com/jareer12/code-grepper#codegrepper-api-docsunofficial