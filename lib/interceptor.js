import {
  isFunction,
  identity,
  promiseRejectIdentity,
} from './utils'

class Interceptor {
  constructor() {
    this.handlers = []
  }

  use(fulfilled = identity, rejected = promiseRejectIdentity) {
    const handlers = this.handlers

    handlers.push(fulfilled, rejected)
  }

  remove(fn) {
    const handlers = this.handlers
    const index = handlers.indexOf(fn)

    if (index !== -1) {
      handlers[index] = null
    }
  }

  forEach(fn) {
    if (!isFunction(fn)) {
      return
    }

    const handlers = this.handlers
    const len = handlers.length

    for (let i = 0; i < len; i += 2) {
      const [ fulfilled = identity, rejected = promiseRejectIdentity] = [ handlers[i], handlers[i + 1] ]

      fn.call(null, fulfilled, rejected)
    }
  }
}

export default Interceptor
