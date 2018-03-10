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
    if (fulfilled === identity && rejected === promiseRejectIdentity) {
      return
    }

    this.handlers.push(fulfilled, rejected)
  }

  remove(handler) {
    const handlers = this.handlers
    const index = handlers.indexOf(handler)

    if (index !== -1) {
      handlers[index] = undefined
    }
  }

  forEach(callback) {
    if (!isFunction(callback)) {
      return
    }

    const handlers = this.handlers
    const len = handlers.length

    for (let i = 0; i < len; i += 2) {
      const [fulfilled = identity, rejected = promiseRejectIdentity] = [handlers[i], handlers[i + 1]]

      callback.call(null, fulfilled, rejected)
    }
  }
}

export default Interceptor
