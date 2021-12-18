## Installation

```shell
npm i grepper
```

## Quick Guide
   * [User Related Functions](https://github.com/jareer12/grepper#users)
   * [Answer Related Functions](https://github.com/jareer12/grepper#answers)
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
            /* Your Code Here */
        }).catch(err => {
            console.log(err)
        })
}
__main__()
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

### `userStats()`

Fetches The user's code grepper belt stats. The first parameter is the `user_id(int)`.

```js
async function __main__() {
    Data = await GREPPER.userBeltStats(98467, true)
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

### `getWhoToFollow()`

This functions get all the recommended users to follow that you can find on the [feed](https://www.codegrepper.com/app/feed.php) page, first parameter is [PHPSESSID][].

```js
async function __main__() {
    Data = await GREPPER.getComments(23, true)
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


[UsersDocs]: https://github.com/jareer12/code-grepper#users
[AnswersDocs]: https://github.com/jareer12/code-grepper#answers
[SettingsDocs]: https://github.com/jareer12/code-grepper#settings
[PHPSESSID]: https://github.com/jareer12/code-grepper#dealing-with-authorizations
[GlobalDocs]: https://github.com/jareer12/code-grepper#codegrepper-api-docsunofficial