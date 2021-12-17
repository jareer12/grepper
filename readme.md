## Installation

```shell
npm i grepper
```

## Users

### userInfo

Fetches code Grepper user's profile information. The first parameter is the user_id and the second parameter is to debug, set to true to debug.

```js
async function __main__() {
    Data = await GREPPER.userInfo(98467, true)
    console.log(Data)
} __main__()
```

### userStats

Fetches The user's code grepper belt stats. The first parameter is the user_id and the second parameter is to debug, set to true to debug.

```js
async function __main__() {
    Data = await GREPPER.userBeltStats(98467, true)
    console.log(Data)
} __main__()
```