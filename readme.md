## Installation

```shell
npm i grepper
```

## Users

### userInfo

Fetches code Grepper user's profile information.

```js
async function __main__() {
    Data = await GREPPER.userInfo(98467, true)
    console.log(Data)
} __main__()
```