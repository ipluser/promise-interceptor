# promise-interceptor

An interceptor tool for `Promise`.


## Quick Start

Installation:

```js
$ tnpm install --save promise-interceptor
```

Usage:

- intercept a `Promise`

```js
import { Interceptor, execute } from 'promise-interceptor'

const interceptor = new Interceptor()

interceptor.use((res) => {
  // do something with response data
  return res
}, (err) => {
  // do something with response error
  return Promise.reject(err)
})

const myPromise = new Promise((resolve, reject) => {
  // todo
})

const wrappedPromise = execute(myPromise, interceptor)

wrappedPromise((res) => {
  // todo
}, (err) => {
  // todo
})
```

- intercept a function that must return a `Promise`

```js
import { Interceptor, execute, connect } from 'promise-interceptor'

const interceptor = new Interceptor()

interceptor.use((res) => {
  // do something with response data
  return res
}, (err) => {
  // do something with response error
  return Promise.reject(err)
})

const myFunction = () => {
  // todo

  // must return a Promise
  return new Promise((resolve, reject) => {
    // todo
  })
}

const wrappedFunction = connect(interceptor)(myFunction)

wrappedFunction().then((res) => {
  // todo
}, (err) => {
  // todo
})
```


## API

### `Interceptor`

An class that is used to manage `Promise` interceptors.

#### `use([fulfilled], [rejected])`

Add a interceptor that includes fulfilled or rejected handler.

```js
// add fulfilled handler
interceptor.use((res) => {
  // todo
  return Promise.resolve(res)
})

// add rejected handler
interceptor.use(undefined, (err) => {
  // todo
  return Promise.reject(err)
})

// add fulfilled and rejected handler
interceptor.use((res) => {
  // todo
  return Promise.resolve(res)
}, (err) => {
  // todo
  return Promise.reject(err)
})
```

#### `remove(handler)`

Remove the specified handler.

```js
const fulfilledHandler = (res) => {
  // todo
  return Promise.resolve(res)
}

interceptor.use(fulfilledHandler)

// ...

interceptor.remove(fulfilledHandler)
```

#### `forEach(callback)`

Iterate over all the interceptors.

```js
interceptor.forEach((fulfilled, rejected) => {
  // todo
})
```


### `execute(Promise, Interceptor)`

Execute a `Promise` with `Interceptor`.

```js
execute(myPromise, interceptor)
```


### `connect(interceptor)`

Connect a function to a `Interceptor`, the function must return a `Promise`. It wrap the function with `Interceptor` and return a new function for you to use.

```js
const wrappedFunction = connect(interceptor)(myFunction)

wrappedFunction(args).then((res) => {
  // todo
}, (err) => {
  // todo
})
```
