## Installation

```shell
npm i grepper
```

## Global
    
### `checkCookie()`

To check if a cookie is valid use this function.

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

The last parameter of every fucntion is `toLog(bool)`, which is used to debug, the `toLog(bool)` parameter console logs important info. Set it to `true` to enable.

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

This functions get all the recommended users to follow that you can find on the [feed](https://www.codegrepper.com/app/feed.php) page, first parameter is [Cookie][].

```js
async function __main__() {
    Data = await GREPPER.getComments(23, true)
    console.log(Data)
} __main__()
```

[UsersDocs]: https://github.com/jareer12/code-grepper#users
[AnswersDocs]: https://github.com/jareer12/code-grepper#answers
[Cookie]: https://github.com/jareer12/code-grepper#dealing-with-authorizations