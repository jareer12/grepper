## Installation

```shell
npm i grepper
```

## [Users]()

The last parameter of every fucntion is `toLog`, which is used to debug, the `toLog` parameter console logs important info. Set it to `true` to enable.

### `userInfo()`

Fetches code Grepper user's profile information. The first parameter is the `user_id`.

```js
async function __main__() {
    Data = await GREPPER.userInfo(98467, true)
    console.log(Data)
} __main__()
```

### `userStats()`

Fetches The user's code grepper belt stats. The first parameter is the `user_id`.

```js
async function __main__() {
    Data = await GREPPER.userBeltStats(98467, true)
    console.log(Data)
} __main__()
```

### `userTopAnswers()`

Fetches The user's top code grepper answers. The first parameter is the `user_id`.

```js
async function __main__() {
    Data = await GREPPER.userTopAnswers(98467, true)
    console.log(Data)
} __main__()
```

### `searchUsers()`

Searches for code grepper users The first parameter is the `user_name`.

```js
async function __main__() {
    Data = await GREPPER.searchUsers("Jareer", true)
    console.log(Data)
} __main__()
```

## [Answers]()

### `getAnswers()`

Fetches coding answers from code grepper, enter the query in the first parameter.

```js
async function __main__() {
    Data = await GREPPER.getAnswers("js loop", true)
    console.log(Data)
} __main__()
```
