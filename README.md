# promise-interceptor

An interceptor tool for Promise.


## Quick Start

Installation:

```js
$ tnpm install --save promise-interceptor
```

Usage:

- intercept Promise

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

const myPromise = new Promise((resolve, reject) => {
  // todo
})
const result = execute(myPromise, interceptor)

result.then((res) => {
  // todo
}, (err) => {
  // todo
})
```

- intercept a function that return a Promise

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

  // return a Promise
  return new Promise((resolve, reject) => {
    // todo
  })
}
const wrapFunction = connect(interceptor)(myFunction)

wrapFunction()..then((res) => {
  // todo
}, (err) => {
  // todo
})
```