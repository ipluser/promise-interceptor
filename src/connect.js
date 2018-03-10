import execute from './execute'

const connect = (interceptor) => (fn) => (...args) => {
  const promise = fn.call(null, ...args)

  return execute(promise, interceptor)
}

export default connect
