import { isFunction } from './utils'

export const execute = (promise, interceptor) => {
  if (!interceptor || !isFunction(interceptor.forEach)) {
    return promise
  }

  let finalPromise = (promise instanceof Promise) ? promise : Promise.resolve(promise)

  interceptor.forEach((fulfilled, rejected) => {
    finalPromise = finalPromise.then(fulfilled, rejected)
  })

  return finalPromise
}

export const connect = (interceptor) => (fn) => (...args) => {
  const promise = fn.call(null, ...args)

  return execute(promise, interceptor)
}
